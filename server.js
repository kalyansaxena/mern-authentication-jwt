const express = require("express");
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/error");
const cors = require("cors");
require("dotenv").config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", require("./routes/auth"));

app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(`Server started listening on ${PORT}`)
);

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
