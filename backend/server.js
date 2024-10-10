// server.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/usersRoutes");
require("dotenv").config();

const app = express();
app.use(express.static(path.join(__dirname, "../frontend")));
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/pages/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
