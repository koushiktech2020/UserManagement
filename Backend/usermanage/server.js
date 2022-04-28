const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const cors = require("cors");

const path = require("path");

const port = process.env.PORT || 5000;

const api = require("./router/api");

app.use(express.static("public")); //SSR => Server Static resources.
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", api);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(port, () => {
  console.log(`Server has started at ${port}`);
});
