require("dotenv").config();

const { PORT } = process.env;
const express = require("express");
const morgan = require("morgan");
const routes = require("./routes");
const app = express();


app.use(express.json());
app.use(morgan("dev"));

app.use(routes);
// Main
app.get("/", (req, res) => {
  return res.status(200).send("ZAHLEN ACCOUNTING - API");
});


// Handling error not found!
app.use((req, res, next) => {
  return res.status(404).json({
    status: false,
    message: "are you lost?",
    data: null,
  });
});

// Handling error internal server error!
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({
    status: false,
    message: err.message,
    data: null,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} || http://localhost:${PORT}`);
});
