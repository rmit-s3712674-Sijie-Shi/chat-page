import startServer from "./startServer.js";
import express from 'express';
import cors from 'cors';
import { login, createUser, getUser, getUserProfile, auth } from "./functions.js";
import { getAllForms, createForms, updateForm, getSingleForm } from "./formFunctions.js";


const app = express()
app.use(cors())
app.use(express.json())


app.post("/login", login)
app.post("/createuser", createUser)
app.get("/users", getUser)
app.get("/profile",auth, getUserProfile)

app.get("/getallforms", getAllForms)
app.post("/createforms", createForms)
app.post("/updateform", updateForm)
app.post("/getsingleform", getSingleForm)



startServer(app, 3001)

