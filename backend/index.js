const connectToMongo = require("./db");
var cors = require("cors");

// Start server only after successful DB connection
// This avoids Mongoose buffering errors when Mongo isn't reachable
const startServer = async () => {
  try {
    await connectToMongo();
  } catch (err) {
    console.error("Mongo connection failed:", err);
    process.exit(1);
  }

  const express = require("express");
  const app = express();
  const port = 5000;

  app.use(cors());

  app.use(express.json());
  app.use("/api/auth", require("./routes/auth"));
  app.use("/api/notes", require("./routes/notes"));

  app.listen(port, () => {
    console.log(`iNotebook listening on port ${port}`);
  });
};

startServer();
