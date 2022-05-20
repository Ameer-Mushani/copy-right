const express = require("express");
const app = express();
const http = require("http");

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

//send file to client
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/client.html");
});