import { MongoClient } from "mongodb";

const db = {
  orders: [
    { item: "almonds", price: 12, quantity: 2 },
    { item: "pecans", price: 20, quantity: 1 },
    { item: "pecans", price: 20, quantity: 3 },
  ],

  inventories: [
    { sku: "almonds", description: "product 1", instock: 120 },
    { sku: "bread", description: "product 2", instock: 80 },
    { sku: "cashews", description: "product 3", instock: 60 },
    { sku: "pecans", description: "product 4", instock: 70 },
  ],

  users: [
    { username: "admin", password: "MindX@2022" },
    { username: "alice", password: "MindX@2022" },
  ],
};
const mongodbURL =
  "mongodb+srv://quanghoang508:Kiwi123@cluster0.cokwlvl.mongodb.net/";
const client = new MongoClient(mongodbURL);
const database = client.db("testweb65");

const ordersCollection = database.collection("orders");
const inventoriesCollection = database.collection("inventories");
const usersCollection = database.collection("users");

const dbConnect = async () => {
  try {
    await client.connect();
    await ordersCollection.insertMany(db.orders);
    await inventoriesCollection.insertMany(db.inventories);
    await usersCollection.insertMany(db.users);
    return { ordersCollection, inventoriesCollection, usersCollection };
    } catch (error) {
    console.log(error);
  }
};

export {dbConnect,ordersCollection,inventoriesCollection,usersCollection};