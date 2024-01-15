import express from "express";

const server = express();

const port = 5000;

server.get("/test", (req, res) => {
  res.json({ message: "Hello, world!" });
});

server.listen(port, () => {
  console.log("Server listening to port: " + port);
});
