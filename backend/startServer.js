import { createServer } from "http";

const startServer = (app, port) => {

const server = createServer(app)

server.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

server.on('error', (err) => {
    console.error(err)
})
}

export default startServer;