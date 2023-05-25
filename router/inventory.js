import express from "express";
import { inventoriesCollection } from "../db/connectDB.js";

const inventoryRouter = express.Router();

inventoryRouter.get("/db", async (req, res) => {
  const resoult = await inventoriesCollection.find().toArray();
  // const resoult = db.collection("inventories");
  res.status(200).json({
    Message: "read data success",
    data: resoult,
  });
});

inventoryRouter.get("/instock", async (req, res) => {
  try {
    const inventories = await inventoriesCollection.find({ instock: { $lt: 100 } }).toArray();
    res.status(200).json({
      message: "Success",
      data: inventories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Fail",
      data: null,
    });
  }
});

export default inventoryRouter;