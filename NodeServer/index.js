const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/api");

  console.log("db connection");
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);
const server = express();

server.use(cors());
server.use(bodyParser.json());

server.post("/api/", async (request, response) => {
  let user = new User();
  user.username = request.body.username;
  user.password = request.body.password;
  const doc = await user.save();
  console.log(doc);
  response.json(doc);
});
server.get("/api", async (request, response) => {
  const docs = await User.find({});
  response.json(docs);
});
server.listen(8080, () => {
  console.log("server started");
});
