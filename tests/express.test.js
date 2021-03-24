const express = require("express")
const fetch = require("node-fetch")

const aql = require("../express")
const engine = require("../index.js")
const {userSearch, seqQuery} = require("./test.config")

const service = engine()
service.register(userSearch)

const server = express()

server.use(express.json())

server.post(
    "/aql",
    aql(service)
)

server.listen(
    1338,
    async () => {
        const response = await fetch(
            "http://localhost:1338/aql",
            {
                method: "POST",
                body: JSON.stringify(seqQuery),
                headers: {
                    "content-type": "application/json"
                }
            }
        )

        console.log(await response.json())
        process.exit(0)
    }
)
