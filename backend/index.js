import startServer from "./startServer.js";
 import express from 'express';
import cors from 'cors';
import { login, createUser, getUser } from "./functions.js";

const app = express()
app.use(cors())
app.use(express.json())

app.post("/login", login)
app.post("/createuser", createUser)
app.get("/", getUser)


startServer(app, 3001)

