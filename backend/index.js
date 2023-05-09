import startServer from "./startServer.js";
 import express from 'express';
import cors from 'cors';
import { login, createUser } from "./functions.js";

const app = express()
app.use(cors())
app.use(express.json())

app.post("/login", login)
app.post("/createuser", createUser)


startServer(app, 3001)

