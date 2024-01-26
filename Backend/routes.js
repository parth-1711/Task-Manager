import jwt from "jsonwebtoken";

import express from "express";
import {
  createOrUpdate,
  deleteTasksById,
  getTasksById,
  readAllTasks,
} from "./db.js";

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token not provided" });
  }

  jwt.verify(token, process.env.TOKEN_SECRETE_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
};

router.use(verifyToken);

// READ ALL Tasks
router.get("/tasks", async (req, res) => {
  const user=req.query.user;
  // console.log(user);
  const { success, data } = await readAllTasks();
  const result=data.filter((row)=>{
    // console.log(row.user);
    return row.user==user;
  })
  if (success) {
    return res.json({ success, result });
  }
  return res.status(500).json({ success: false, messsage: "Error" });
});

// Get User by ID
router.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { success, data } = await getTasksById(id);
  
  // console.log(data);
  if (success) {
    return res.json({ success, data });
  }

  return res.status(500).json({ success: false, message: "Error" });
});

// Create User
router.post("/tasks", async (req, res) => {
  const { success, data } = await createOrUpdate(req.body);

  if (success) {
    return res.json({ success, data });
  }

  return res.status(500).json({ success: false, message: "Error" });
});

// Update User by ID
router.put("/tasks/:id", async (req, res) => {
  const user = req.body;
  const { id } = req.params;
  user.id = parseInt(id);

  const { success, data } = await createOrUpdate(user);

  if (success) {
    return res.json({ success, data });
  }

  return res.status(500).json({ success: false, message: "Error" });
});

// Delete User by Id
router.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(typeof(id));
  const { success, data } = await deleteTasksById(id);
  if (success) {
    return res.json({ success, data });
  }
  return res.status(500).json({ success: false, message: "Error" });
});

export default router;
// module.exports = router;
