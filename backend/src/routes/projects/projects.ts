import express, { Router, Request, Response } from "express";
import argon2 from "argon2";
import mysql, { Connection } from "mysql2/promise";
const router: Router = express.Router();
import "dotenv/config";

router.get(
  "/",
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

    await pool.connect();

    let queryData: any = undefined;
    try {
      const [dataTables, dataRows] = await pool.query(
        "SELECT * FROM projects",
        []
      );
      queryData = dataTables;
      await pool.end();
    } catch {
      await pool.end();
      return res
        .json({ message: "failed", response: "Failed to query to database!" })
        .status(403);
    }

    return res.json({ message: "success", response: queryData }).status(200);
  }
);

router.post(
  "/",
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

    const data: string = JSON.stringify(req.body);
    const postData = JSON.parse(data);

    if (!postData.projectname)
      return res.json({
        message: "failed",
        response: "Response body invalid, missing projectname!",
      });

    if (!postData.projectpic)
      return res.json({
        message: "failed",
        response: "Response body invalid, missing projectpic!",
      });

    if (!postData.projectdesc)
      return res.json({
        message: "failed",
        response: "Response body invalid, missing projectdesc!",
      });

    if (!postData.projectstatus)
      return res.json({
        message: "failed",
        response: "Response body invalid, missing projectstatus!",
      });

    await pool.connect();

    try {
      const [dataTables, dataRows] = await pool.query(
        "INSERT INTO projects(projectname, projectpic, projectdesc, projectstatus) VALUES(?, ?, ?, ?)",
        [
          postData.projectname,
          postData.projectpic,
          postData.projectdesc,
          postData.projectstatus,
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
      .json({ message: "success", response: "Successfully added new project" })
      .status(200);
  }
);

export default router;
