import pkg from "jsonwebtoken";
import * as fs from 'node:fs';

export const auth = async (req, res, next) => {
    const rawJson = fs.readFileSync("../environment/secret.json")
    const { secret } = JSON.parse(rawJson)
    const rawToken = String(req.headers.authorization).split(' ').pop()
    const { id } = pkg.verify(rawToken, secret)
    req.user = id    
    next()
}