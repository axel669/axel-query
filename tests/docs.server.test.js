const express = require("express")
const fetch = require("node-fetch")

const aql = require("../express")
const engine = require("../index.js")
const { seqQuery } = require("./test.config")

const service = engine(__dirname, "handlers")

const server = express()

server.use(express.json())

server.post(
    "/aql",
    aql(service)
)
server.get(
    "/aqli",
    (req, res) => {
        res.send(service.docs())
    }
)
server.use(
    express.static("C:\\Users\\Axel\\Documents\\programming\\svelte\\axel-query-i\\build")
)

server.listen(
    1338,
    async () => {
        console.log("Server Ready")
    }
)
