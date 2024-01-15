import express from "express";
import apiRouter from "./apiRouter.js";

const server = express();

const port = 5000;

server.use("/api", apiRouter);

server.listen(port, () => {
  console.log("Server listening to port: " + port);
});
