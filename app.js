require("dotenv").config();

const { PORT } = process.env;
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json);
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} || http://localhost:${PORT}`);
});
