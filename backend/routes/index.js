import express from "express";
import userRoutes from "./user";
import profileRoutes from "./profile";
import categoryRoutes from "./category";
import tagRoutes from "./tag";

const routers = express.Router();

routers.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
    version: "1.0.0",
  });
});

routers.use("/users", userRoutes);
routers.use("/profiles", profileRoutes );
routers.use("/category", categoryRoutes );
routers.use("/tags", tagRoutes );

export default routers;