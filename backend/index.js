import startServer from "./startServer.js";
import express from "express";
import cors from "cors";
import {
  login,
  createUser,
  getUser,
  getUserProfile,
  auth,
} from "./functions.js";
import { readUserForms, createForm, updateForm, deleteSavedForm, deleteSentForm } from "./formFunctions.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/login", login);
app.post("/createuser", createUser);
app.get("/users", getUser);
app.get("/profile", auth, getUserProfile);

app.post("/getuserforms", readUserForms);
app.post("/createform", createForm);
app.post("/updateForm", updateForm);
app.post("/deleteSavedForm", deleteSavedForm);
app.post("/deleteSentForm", deleteSentForm);
// app.post("/getsingleform", getSingleForm)

startServer(app, 3001);
