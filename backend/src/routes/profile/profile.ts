import express, { Router, Request, Response } from "express";
import validateAuth from "../../utilities/auth.js";
import fileUpload, { UploadedFile } from "express-fileupload";
import mysql, { Connection } from "mysql2/promise";
const router: Router = express.Router();
import "dotenv/config";

router.get(
  "/:username",
  validateAuth,
  async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    if (!process.env.MYSQL_PORT)
      return res.send({
        message: "failed",
        response: "Failed to find MySQL Connection Port!",
      });

    const pool: Connection = await mysql.createConnection({
      connectionLimit: 100,
      port: parseInt(process.env.MYSQL_PORT),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DATABASE,
    });

    const username: string = req.params.username;

    if (!username)
      return res.json({
        message: "failed",
        response: "No username found in get url",
      });

    await pool.connect();

    let queryData: any = undefined;
    try {
      const [dataTables, dataRows] = await pool.query(
        "SELECT * FROM data WHERE username = ?",
        [username]
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
        .json({ message: "failed", response: "No user account found!" })
        .status(403);

    let profileImage = undefined;
    if (queryData[0]?.profile_pic)
      profileImage = {
        picture: Buffer.from(queryData[0]?.profile_pic).toString("base64"),
        type: "buffer",
      };
    else
      profileImage = {
        picture:
          "https://as2.ftcdn.net/v2/jpg/00/64/67/63/1000_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
        type: "link",
      };

    return res.json({ message: "success", response: profileImage }).status(200);
  }
);

router.post(
  "/uploadpfp/:username",
  fileUpload({ createParentPath: true }),
  async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    if (!process.env.MYSQL_PORT)
      return res.send({
        message: "failed",
        response: "Failed to find MySQL Connection Port!",
      });

    const pool: Connection = await mysql.createConnection({
      connectionLimit: 100,
      port: parseInt(process.env.MYSQL_PORT),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DATABASE,
    });

    const username: string = req.params.username;
    const file: UploadedFile = req.files?.file as UploadedFile;

    if (!username)
      return res.json({
        message: "failed",
        response: "No username found in get url",
      });
    if (!file.data)
      return res.json({
        message: "failed",
        response: "No picture data found, picture invalid?",
      });

    const fileBuffer: Buffer = new Buffer(file.data);

    await pool.connect();

    let queryData: any = undefined;
    try {
      const [dataTables, dataRows] = await pool.query(
        "UPDATE data SET profile_pic = ? WHERE username = ?",
        [fileBuffer, username]
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
        .json({ message: "failed", response: "No user account found!" })
        .status(403);

    return res
      .json({
        message: "success",
        response: "Successfully updated profile picture!",
      })
      .status(200);
  }
);

router.post(
  "/changedesc/:username",
  async (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> => {
    if (!process.env.MYSQL_PORT)
      return res.send({
        message: "failed",
        response: "Failed to find MySQL Connection Port!",
      });

    const pool: Connection = await mysql.createConnection({
      connectionLimit: 100,
      port: parseInt(process.env.MYSQL_PORT),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DATABASE,
    });

    const username: string = req.params.username;

    const data: string = JSON.stringify(req.body);
    const postData = JSON.parse(data);

    if (!username)
      return res.json({
        message: "failed",
        response: "No username found in get url",
      });
    if (!postData.description)
      return res.json({
        message: "failed",
        response: "No description found!",
      });

    await pool.connect();

    let queryData: any = undefined;
    try {
      const [dataTables, dataRows] = await pool.query(
        "UPDATE data SET description = ? WHERE username = ?",
        [postData.description, username]
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
        .json({ message: "failed", response: "No user account found!" })
        .status(403);

    return res
      .json({
        message: "success",
        response: "Successfully updated profile description!",
      })
      .status(200);
  }
);

export default router;
