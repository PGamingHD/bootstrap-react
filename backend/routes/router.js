import express from "express";
const router = express.Router();

import testRoute from "./test/test.js";
import loginRoute from "./login/login.js";
import registerRoute from "./register/register.js";
import profileRoute from "./profile/profile.js";
import contactRoute from "./contact/contact.js";
import usersRoute from "./users/users.js";

router.use("/test", testRoute);
router.use("/login", loginRoute);
router.use("/register", registerRoute);
router.use("/profile", profileRoute);
router.use("/contact", contactRoute);
router.use("/users", usersRoute);

router.get("/", (req, res) => {
  res.json({ message: "The API is up and running! (ROOT DIR)" }).status(200);
});

export default router;
