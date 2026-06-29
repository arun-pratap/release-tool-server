const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const endPoints = require("./controllers/endpoints.controller")
const releaseRoutes = require("./routes/release.routes");
const sql = require("./config/db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", endPoints);
// Routes Mounting
app.use("/api/releases", releaseRoutes);

// Fallback Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong internally." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server executing safely on port ${PORT}`));

module.exports = app;
module.exports.handler = serverless(app);
