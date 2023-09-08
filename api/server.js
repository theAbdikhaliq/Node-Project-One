// Initialize express app

import express from "express";
import { find, findById, insert, update, remove } from "./users/model.js";

const app = express();
app.use(express.json());

// GET ALL USERS
app.get("/users", async (req, res) => {
  try {
    const users = await find();
    res.status(400).json({ message: users });
  } catch {
    res.status(400).json({ message: "Error occured on loading" });
  }
});

// GET USER BY ID
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await findById(id);
    res.status(200).json({ message: user });
  } catch {
    res.status(400).json({ message: "Error occured on loading" });
  }
});

// CREATE A NEW USER
app.post("/users", async (req, res) => {
  const { name, bio } = req.body;
  try {
    const newUser = await insert({ name, bio });
    res.status(200).json({ message: newUser });
  } catch {
    res.status(400).json({ message: "User cannot be created" });
  }
});

// UPDATE A USER
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  try {
    const updateUser = await update(id, { name, bio });
    if (!updateUser) {
      return res.status(400).json({ error: "User not found" });
    }
    res.status(200).json({ message: updateUser });
  } catch {
    res.status(400).json({ message: "User cannot be updated" });
  }
});

// DELETE A USER
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await remove(id);
    if (!deletedUser) {
      return res.status(400).json({ error: "User not found" });
    }
    res.status(200).json({ message: deletedUser });
  } catch {
    res.status(400).json({ message: "User cannot be deleted" });
  }
});

// start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
