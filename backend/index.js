require("dotenv").config();

const express = require("express");
const port = process.env.PORT ||  3000;
const cors = require("cors");
const { default: routers } = require("./routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routers);
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} `);
});
