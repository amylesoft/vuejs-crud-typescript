const express = require("express") // eslint-disable-line
const serveStatic = require("serve-static") // eslint-disable-line
const path = require("path") // eslint-disable-line

const app = express()

//here we are configuring dist to serve app files
app.use("/", serveStatic(path.join(__dirname, "/dist")))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, "/dist/index.html"))
})

const port = process.env.PORT
app.listen(port)
console.log(`app is listening on port: ${port}`)
