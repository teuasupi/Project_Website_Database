const express = require("express");
const router = express.Router();
const user = require("./user");

router.get("/", async (req, res) => {
    try {
      res.status(200).json({ message: "Masuk nih" });
    } catch (error) {
      console.error("Database connection failed:", error);
      res.status(500).json({ error: "Database connection failed" });
    }
  });

router.use("/user", user)


module.exports = router;
