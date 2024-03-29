const express = require("express")
const fetch = require("node-fetch")

const aql = require("../express")
const engine = require("../index.js")
const {seqQuery} = require("./test.config")

const service = engine(__dirname, "handlers")

const server = express()

server.use(express.json())

server.post(
    "/aql",
    aql(service)
)

server.listen(
    1338,
    async () => {
        const docResponse = await fetch(
            "http://localhost:1338/aql",
            {
                method: "POST",
                body: JSON.stringify(["docs"]),
                headers: {
                    "content-type": "application/json"
                }
            }
        )

        console.log(await docResponse.json())

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
