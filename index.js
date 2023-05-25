import express from "express";
import inventoryRouter from "./router/inventory.js";
import {dbConnect} from "./db/connectDB.js";
import authRouter from "./router/auth.js";

const app = express();
dbConnect();


app.use(express.json());
app.use("/inventory", inventoryRouter);
app.use("/auth",authRouter)

app.listen(5000, () => {
  console.log("server is running");
});