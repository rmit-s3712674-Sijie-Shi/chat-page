import { Data } from "./data"

const data = new Data()

export function getUser(req, res) {
    res.status(200).json(data.list())
}

export function createUser(req, res) {
    const { email, password } = req.body || {}
    data.read(email) ? res.status(400).send("Email has been used.") : data.create({ email, password })
    res.status(201).send(`User ${email} has been successfully created.`)
}

export function login(req, res) {
    const { email, password } = req.body || {}
    const user = data.read(email) ? data.read(email) : {}
    user.password === password ? res.status(201).send('login') : res.status(400).send("Wrong password.")
}