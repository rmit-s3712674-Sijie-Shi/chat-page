// export class Data {
//     localData = [{
//         email: "a",
//         password: "1"
//     }]

//     create = (item) => {
//         this.localData.push(item)
//     }

//     read = (id) => {
//         let item = this.localData.find(res => res.email === id)
//         return item
//     }

//     update = (id, value) => {
//         let itemIndex = this.localData.findIndex(res => res.email === id)
//         if(itemIndex <0) return undefined
//         this.localData[itemIndex] = value
//         return this.localData[itemIndex]
//     }

//     delete = (id) => {
//         this.localData = this.localData.filter(res => res.email !== id)
//     }

//     list = () => {
//         return this.localData
//     }
// }
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dynamoose from "dynamoose";
import * as fs from "node:fs";

const rawJson = fs.readFileSync("./environment/secret.json");
const { mongo } = JSON.parse(rawJson);

mongoose
  .connect("mongodb://127.0.0.1:27017/form-auth")
  .then((res) => console.log("mongodb connected"))
  .catch((e) => console.error(e));

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: {
    type: String,
    set(val) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(val, salt);
      return hash;
    },
  },
});

const UserFormSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  savedForms: { type: Array },
  sentForms: { type: Array },
  finishedForms: { type: Array },
});

const savedForms = new mongoose.Schema({
  formId: { type: String, unique: true },
  userId: { type: String },
  title: { type: String },
  questions: { type: Array },
  timestamp: { type: String },
});

const sentForms = new mongoose.Schema({
  formId: { type: String, unique: true },
  userId: { type: String },
  title: { type: String },
  questions: { type: Array },
  timestamp: { type: String },
  endtime: { type: String },
  permissions: { type: [String] },
});

const formCreated = new mongoose.Schema({
  userId: { type: String, unique: true },
  savedForms: { type: [String] },
  sentForms: { type: [String] },
});

export const FormCreated = mongoose.model("FormCreated", formCreated);

export const SavedForm = mongoose.model("SavedForm", savedForms);

export const SentForm = mongoose.model("SentForm", sentForms);

export const User = mongoose.model("User", UserSchema);

export const UserForm = mongoose.model("UserForm", UserFormSchema);
