import express, {Request, Response, Router} from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config";
import mysql, {Connection} from "mysql2/promise";
const router: Router = express.Router();

router.post("/", async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    if (!process.env.MYSQL_PORT) return res.send({message: 'failed', response: 'Failed to find MySQL Connection Port!'});
    if (!process.env.JWT_SIGNING) return res.send({message: 'failed', response: 'Failed to find JWT_SIGNING string!'});

    const pool: Connection = await mysql.createConnection({
        connectionLimit: 100,
        port: parseInt(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DATABASE,
    });

    const data: string = JSON.stringify(req.body);
    const postData = JSON.parse(data);

    if (!postData.user)
        return res.json({
            message: "failed",
            response: "Response body invalid, missing user!",
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
            [postData.user.toLowerCase(), postData.user.toLowerCase()]
        );
        queryData = dataTables;
        await pool.end();
    } catch {
        await pool.end();
        return res
            .json({ message: "failed", response: "Failed to query to database!" })
            .status(403);
    }

    if (queryData.length === 0)
        return res
            .json({ message: "failed", response: "No account found!" })
            .status(403);

    if (!(await argon2.verify(queryData[0].pass, postData.password)))
        return res.json({
            message: "failed",
            response: "Account password did not match account!",
        });

    const jwtToken: string = jwt.sign(
        {
            id: queryData[0].userId,
            username: queryData[0].username,
            displayname: queryData[0].displayname,
        },
        process.env.JWT_SIGNING
    );

    return res
        .json({
            message: "success",
            response: "Login successful!",
            token: jwtToken,
            data: {
                role: queryData[0].role,
                username: queryData[0].username,
                displayname: queryData[0].displayname,
            },
        })
        .status(200);
});
export default router;
