import express, { Express, Request, Response } from "express";
import "dotenv/config";
import mainRouter from "./routes/router";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const server: Express = express();
const port: string | undefined = process.env.EXPRESS_PORT;

server.use(bodyParser.urlencoded({ extended: false }));

server.use(bodyParser.json());

server.use(cookieParser());

server.use("/api", mainRouter);

server.use("*", (req: Request, res: Response) => {
  return res.json({ message: "Endpoint invalid" }).status(403);
});

server.listen(port, () => {
  return console.log(
    `[BACKEND] <==> || Successfully started Backend Server on port ${port}! || <==> [BACKEND]`
  );
});
