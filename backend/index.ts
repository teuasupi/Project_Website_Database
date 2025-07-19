import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import router from "./src/routes";
import pool from "./src/config/config";

const port: number = 3000;
const app: express.Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api/test", async (req: express.Request, res: express.Response) => {
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