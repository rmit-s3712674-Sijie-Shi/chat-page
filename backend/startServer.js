import http from "http";

const startServer = (app, port) => {

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' })
//     res.end('Hello World')
// })

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

app.on('error', (err) => {
    console.error(err)
})
}

export default startServer;