import express, {Router, Request, Response} from "express";
import argon2 from "argon2";
import mysql, {Connection} from "mysql2/promise";
const router: Router = express.Router();
import "dotenv/config";

router.post("/", async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    if (!process.env.MYSQL_PORT) return res.send({message: 'failed', response: 'Failed to find MySQL Connection Port!'});

    const pool: Connection = await mysql.createConnection({
        connectionLimit: 100,
        port: parseInt(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DATABASE,
    });

    const data: string = JSON.stringify(req.body);
    const postData = JSON.parse(data);

    if (!postData.username)
        return res.json({
            message: "failed",
            response: "Response body invalid, missing username!",
        });
    if (!postData.email)
        return res.json({
            message: "failed",
            response: "Response body invalid, missing email!",
        });
    if (!postData.password)
        return res.json({
            message: "failed",
            response: "Response body invalid, missing password!",
        });

    await pool.connect();

    let queryData: any = undefined;
    try {
        const [dataTables, dataRows] = await pool.query(
            "SELECT * FROM data WHERE username = ? OR email = ?",
            [postData.username.toLowerCase(), postData.email.toLowerCase()]
        );
        queryData = dataTables;
    } catch {
        await pool.end();
        return res
            .json({ message: "failed", response: "Failed to query to database!" })
            .status(403);
    }

    if (queryData.length !== 0) {
        await pool.end();
        return res
            .json({ message: "failed", response: "Account name already exists!" })
            .status(403);
    }

    const pass_hash: string = await argon2.hash(postData.password, {
        timeCost: 1024,
        memoryCost: 2048,
        type: argon2.argon2id,
    });

    try {
        await pool.query(
            "INSERT INTO data(username, displayname, email, pass) VALUES(?, ?, ?, ?)",
            [
                postData.username.toLowerCase(),
                postData.username,
                postData.email.toLowerCase(),
                pass_hash,
            ]
        );
        await pool.end();
    } catch {
        await pool.end();
        return res
            .json({ message: "failed", response: "Failed to query to database!" })
            .status(403);
    }

    return res
        .json({ message: "success", response: "User successfully registered!" })
        .status(200);
});
export default router;
