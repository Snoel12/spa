const {
  models: { User, Car, Sale },
  conn,
  syncAndSeed,
} = require("./db");
const path = require("path");

const express = require("express");
const app = express();

app.use("/dist", express.static(path.join(__dirname, "dist")));
//connects our main.js file to the html file

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);
//basically makes a directory path to connect to our html for the homepage

app.use("/api", require("./api"));

const powerON = async () => {
  try {
    await syncAndSeed();
    const port = 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

powerON();
