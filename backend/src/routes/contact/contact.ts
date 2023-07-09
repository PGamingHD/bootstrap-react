import express, { Router, Request, Response } from "express";
import mysql, { Connection } from "mysql2/promise";
const router: Router = express.Router();
import "dotenv/config";
import validateAuth from "../../utilities/auth.js";

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

    let queryData = undefined;
    try {
      const [dataTables, dataRows] = await pool.query("SELECT * FROM contact");
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

router.get(
  "/count",
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
        "SELECT COUNT(*) FROM contact WHERE `read` = ?",
        [false]
      );
      queryData = dataTables;
      await pool.end();
    } catch {
      await pool.end();
      return res
        .json({ message: "failed", response: "Failed to query to database!" })
        .status(403);
    }

    return res
      .json({ message: "success", response: queryData[0]["COUNT(*)"] })
      .status(200);
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

    if (!postData.firstname)
      return res.json({
        message: "failed",
        response: "Response body invalid, missing firstname!",
      });
    if (!postData.lastname)
      return res.json({
        message: "failed",
        response: "Response body invalid, missing lastname!",
      });
    if (!postData.email)
      return res.json({
        message: "failed",
        response: "Response body invalid, missing email!",
      });
    if (!postData.reason)
      return res.json({
        message: "failed",
        response: "Response body invalid, missing reason!",
      });

    await pool.connect();

    try {
      await pool.query(
        "INSERT INTO contact(firstname, lastname, email, reason) VALUES(?, ?, ?, ?)",
        [postData.firstname, postData.lastname, postData.email, postData.reason]
      );
      await pool.end();
    } catch {
      await pool.end();
      return res
        .json({ message: "failed", response: "Failed to query to database!" })
        .status(403);
    }

    return res
      .json({ message: "success", response: "Contact form inserted!" })
      .status(200);
  }
);

router.put(
  "/updateRead",
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

    if (req.body.isRead === null || req.body.isRead === undefined)
      return res.json({
        message: "failed",
        response: "Response body invalid, missing isRead!",
      });

    if (!req.body.contactId)
      return res.json({
        message: "failed",
        response: "Response body invalid, missing contactId!",
      });

    if (req.body.contactId === 0)
      return res.json({
        message: "failed",
        response: "Response body invalid, contactId is not defined correctly!",
      });

    await pool.connect();

    try {
      await pool.query("UPDATE contact SET `read` = ? WHERE contactId = ?", [
        req.body.isRead,
        req.body.contactId,
      ]);

      await pool.end();
    } catch {
      await pool.end();

      return res
        .json({ message: "failed", response: "Failed to query to database!" })
        .status(403);
    }

    return res
      .json({
        message: "success",
        response: "Successfully updated read on ID!",
      })
      .status(200);
  }
);

router.delete(
  "/deleteContact/:contactId",
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

    const contactId: string = req.params.contactId;

    if (!contactId)
      return res.json({
        message: "failed",
        response: "Response body invalid, missing contactId!",
      });

    await pool.connect();

    try {
      await pool.query("DELETE FROM contact WHERE contactId = ?", [contactId]);
      await pool.end();
    } catch {
      await pool.end();
      return res
        .json({ message: "failed", response: "Failed to query to database!" })
        .status(403);
    }

    return res
      .json({ message: "success", response: "Successfully deleted account!" })
      .status(200);
  }
);

export default router;
