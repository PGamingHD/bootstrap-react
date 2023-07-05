import express from "express";
import validateAuth from "../../utilities/auth.js";
import fileUpload from "express-fileupload";
import mysql from "mysql2/promise";
const router = express.Router();
import "dotenv/config";

router.get("/:username", validateAuth, async (req, res) => {
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
      response: "No username found in get url",
    });

  await pool.connect();

  let queryData = undefined;
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
  if (queryData[0]?.profile_pic) {
    profileImage = {
      picture: Buffer.from(queryData[0]?.profile_pic).toString("base64"),
      type: "buffer",
    };
  } else
    profileImage = {
      picture:
        "https://as2.ftcdn.net/v2/jpg/00/64/67/63/1000_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
      type: "link",
    };

  return res.json({ message: "success", response: profileImage }).status(200);
});

router.post(
  "/uploadpfp/:username",
  fileUpload({ createParentPath: true }),
  async (req, res, next) => {
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
        response: "No username found in get url",
      });
    if (!req.files.file.data)
      return res.json({
        message: "failed",
        response: "No picture data found, picture invalid?",
      });

    const fileBuffer = new Buffer(req.files.file.data);

    await pool.connect();

    let queryData = undefined;
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

//import validateAuth from "../../utilities/auth.js";
// Protected route, requires a signed JWT cookie with content to access this route at all!
/*router.get('/', validateAccess, async (req, res) => {
    //const pool = await getPool().getConnection();
    //Get a connection to the database, then use pool.query("QUERY HERE") to send queries to the database!
    //Also make sure to await these as they are promises!

    res.json({message: 'The API is up and running!'}).status(200);
});*/

export default router;
