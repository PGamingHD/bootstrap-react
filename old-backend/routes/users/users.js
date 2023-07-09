import express from "express";
import validateAuth from "../../utilities/auth.js";
import mysql from "mysql2/promise";
const router = express.Router();
import "dotenv/config";

router.get("/", validateAuth, async (req, res) => {
  const pool = await mysql.createConnection({
    connectionLimit: 100,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
  });

  await pool.connect();

  let queryData = undefined;
  try {
    const [dataTables, dataRows] = await pool.query(
      "SELECT userId,username,email,role FROM data"
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
});

router.put("/updateRole", validateAuth, async (req, res) => {
  const pool = await mysql.createConnection({
    connectionLimit: 100,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
  });

  const data = JSON.stringify(req.body);
  const postData = JSON.parse(data);

  if (!postData.userId)
    return res.json({
      message: "failed",
      response: "Response body invalid, missing userId!",
    });

  if (!postData.newRole)
    return res.json({
      message: "failed",
      response: "Response body invalid, missing newRole!",
    });

  await pool.connect();

  let queryData = undefined;
  try {
    const [dataTables, dataRows] = await pool.query(
      "UPDATE data SET role = ? WHERE userId = ?",
      [postData.newRole, postData.userId]
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
    .json({ message: "success", response: "Successfully updated user role!" })
    .status(200);
});

router.delete("/removeUser/:username", validateAuth, async (req, res) => {
  const pool = await mysql.createConnection({
    connectionLimit: 100,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
  });

  const username = req.params.username;

  if (!username)
    return res.json({
      message: "failed",
      response: "Response body invalid, missing username!",
    });

  await pool.connect();

  try {
    await pool.query("DELETE FROM data WHERE username = ?", [username]);
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
});

export default router;
