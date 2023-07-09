import express, {Request, Response, Router} from "express";
const router: Router = express.Router();

import testRoute from "./test/test";
import usersRoute from './users/users';
import registerRoute from './register/register';
import profileRoute from './profile/profile';
import loginRoute from './login/login';
import contactRoute from './contact/contact';

router.use("/test", testRoute);
router.use("/users", usersRoute);
router.use("/register", registerRoute);
router.use("/profile", profileRoute);
router.use("/login", loginRoute);
router.use("/contact", contactRoute);

router.get("/", (req: Request, res: Response): void => {
    res.json({ message: "The API is up and running! (ROOT DIR)" }).status(200);
});

export default router;
