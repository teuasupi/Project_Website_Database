require("dotenv").config();

const express = require("express");
const port = 3000;
const cors = require("cors");
const router = require("./src/routes");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api/test", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.status(200).json({ message: "Database connection successful" });
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use(router);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} `);
});
