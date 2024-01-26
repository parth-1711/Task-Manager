import express, { json } from "express";
import { compare, hashSync } from "bcrypt";
import cors from 'cors';
import User from "./User.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
// require("dotenv").config();
import { connect } from "mongoose";

import task from './routes.js';

const saltRounds = 10;

dotenv.config()

let Tasks = [
    {
      title: "t1",
      desc: "qwertyasdfghjk",
    },
    {
      title: "t2",
      desc: "qwertyasdfghjk",
    },
    {
      title: "t3",
      desc: "qwertyasdfghjk",
    },
    {
      title: "t4",
      desc: "qwertyasdfghjk",
    },
  ];

const app = express();
app.use(json());
app.use(cors({origin:"http://localhost:5173",Credential:true}))



// console.log(process.env.MONGODB_URL);
try {
    connect(process.env.MONGODB_URL);
} catch (error) {
    res.send('<h1>Something went wrong !</h1>')
}




app.post("/login", async (req, res) => {
  const { username, password } = req.body;
//   console.log(username);
  const user = await User.find({ uname: username });
  let isMatch = await compare(password, user[0].password);
  if (isMatch) {
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.TOKEN_SECRETE_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ token: token });
  } else res.status(401).json({ message: "Invalid username or password" });
});

app.post("/signUp", async (req, res) => {
  const { username, password } = req.body;
  const hash = hashSync(password, saltRounds);

  let newUser = new User({
    uname: username,
    password: hash,
  });

  await newUser.save();
  res.json({ message: "User Sucessfully Registered" });
});

app.use('/',task);

// app.get('/list',verifyToken,(req,res)=>{
//     res.status(201).json(Tasks);
// })

// app.get('/Details',verifyToken,(req,res)=>{

// })

app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
