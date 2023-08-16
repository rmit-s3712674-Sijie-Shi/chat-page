import { User } from "./data.js";
import pkg from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as fs from "node:fs";
import { FormCreated } from "./data.js";

export function getUser(req, res) {
  User.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(422).send(err));
}

export function createUser(req, res) {
  console.log(req.body);
  const { username, password } = req.body || {};
  User.create({
    username: username,
    password: password,
  })
    .then(async (data) => {
      await FormCreated.create({
        userId: data._id.toString(),
        savedForms: [],
        sentForms: [],
      });
      res.status(200).send(data);
    })
    .catch((err) => res.status(422).send(err.message));
}

export async function login(req, res) {
  console.log(req.body);
  const rawJson = fs.readFileSync("./environment/secret.json");
  const { secret } = JSON.parse(rawJson);
  const { username, password } = req.body || {};
  const user = await User.findOne({ username: username });
  console.log(user);
  if (!user) {
    return res.status(422).send("No such user");
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  console.log(isPasswordValid);
  if (!isPasswordValid) {
    return res.status(422).send("Wrong password.");
  }
  const token = pkg.sign(
    {
      id: String(user._id),
    },
    secret, {
      expiresIn: "30d"
    }
  );

  res.json({
    user,
    token,
  });
}

export async function getUserProfile(req, res) {
  res.send(req.userId);
}

export const auth = async (req, res, next) => {
  const rawJson = fs.readFileSync("./environment/secret.json");
  const { secret } = JSON.parse(rawJson);
  const rawToken = String(req.headers.authorization).split(" ").pop();
  pkg.verify(rawToken, secret, function (err, decoded) {
    if (err) {
      res.status(403).send("Wrong credential.");
    }    
    else {
      console.log("userid: " + decoded.id)
      req.userId = decoded.id;
      next();
    }
  });
};

export function checkUserAuth(req, res, next) {
  const rawJson = fs.readFileSync("./environment/secret.json");
  const { secret } = JSON.parse(rawJson);
  const rawToken = String(req.headers.authorization).split(" ").pop();
  pkg.verify(rawToken, secret, function (err, decoded) {
    if (err) {
      res.status(403).send("Wrong credential.");
    } else {
      req.user = decoded.id;
      next();
    }
  });
}
