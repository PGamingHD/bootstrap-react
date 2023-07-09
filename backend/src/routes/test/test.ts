import express, {Router} from 'express';
const router: Router = express.Router();

router.get('/', async (req, res) => {
    return res.json({message: 'The API is up and running!'}).status(200);
});

export default router;