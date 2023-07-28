import { User } from "./data.js"
import pkg from "jsonwebtoken";
import bcrypt from "bcryptjs"

const secret = "gdklajgftalouiebgnvafjsalif";

const { Jwt } = pkg
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