import express from "express";
import apiRouter from "./apiRouter.js";
import mongoose from "mongoose";

const server = express();

const port = 5000;

server.use("/api", apiRouter);

mongoose
  .connect(
    "mongodb+srv://giannicimmino1996:Fn87zxUt0GqzPhsw@games-for-sales.lokqg6n.mongodb.net/Users"
  )
  .then(() => {
    server.listen(port, () => {
      console.log("Server listening to port: " + port);
    });
  })

  .catch(() => {
    console.log("Errore nella connessione al DB");
  });
