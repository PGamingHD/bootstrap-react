import express from 'express';
const router = express.Router();

router.get('/',  async (req, res) => {
    //const pool = await getPool().getConnection();
    //Get a connection to the database, then use pool.query("QUERY HERE") to send queries to the database!
    //Also make sure to await these as they are promises!

    return res.json({message: 'The API is up and running!'}).status(200);
});

//import validateAuth from "../../utilities/auth.js";
// Protected route, requires a signed JWT cookie with content to access this route at all!
/*router.get('/', validateAccess, async (req, res) => {
    //const pool = await getPool().getConnection();
    //Get a connection to the database, then use pool.query("QUERY HERE") to send queries to the database!
    //Also make sure to await these as they are promises!

    res.json({message: 'The API is up and running!'}).status(200);
});*/

export default router;