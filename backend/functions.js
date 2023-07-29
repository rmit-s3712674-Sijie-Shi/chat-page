import { User } from "./data.js"
import pkg from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as fs from 'node:fs';


export function getUser(req, res) {
    User.find()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(422).send(err))
}

export function createUser(req, res) {
    console.log(req.body)
    const { username, password } = req.body || {}
    User.create({
        username: username,
        password: password,
    })
      .then(data => res.status(200).send(data))
      .catch(err => res.status(422).send(err.message))
}

export async function login(req, res) {
    console.log(req.body)
    const rawJson = fs.readFileSync("./environment/secret.json")
    const { secret } = JSON.parse(rawJson)
    const { username, password } = req.body || {}
    const user = await User.findOne({ username: username })
    console.log(user)
    if(!user) {
        return res.status(422).send("No such user")
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    console.log(isPasswordValid)
    if(!isPasswordValid) {
        return res.status(422).send("Wrong password.")
    }
    const token = pkg.sign({
        id: String(user._id)
    }, secret)

    res.json({
        user,
        token
    })
    
}

export async function getUserProfile (req, res) {
    res.send(req.user)
}

export const auth = async (req, res, next) => {
    const rawJson = fs.readFileSync("./environment/secret.json")
    const { secret } = JSON.parse(rawJson)
    const rawToken = String(req.headers.authorization).split(' ').pop()
    const { id } = pkg.verify(rawToken, secret)
    req.user = id    
    next()
}