const express = require("express")
const fetch = require("node-fetch")

const aqExpress = require("../express")
const engine = require("..")
const docsPath = require("../iquery/path")
const { seqQuery } = require("./test.config")

const service = engine(__dirname, "handlers")

const server = express()

server.use(express.json())

server.post(
    "/aq",
    aqExpress(service, () => Date.now())
)
server.use(
    express.static(docsPath)
)

server.listen(
    1338,
    async () => {
        console.log("Server Ready")
    }
)
