const fetch = require("node-fetch")

const koa = require("koa")
const router = require("koa-router")
const json = require("koa-json-body")

const aql = require("../koa")
const engine = require("../index.js")
const {paraQuery} = require("./test.config")

const server = new koa()
const routes = new router()

const service = engine(__dirname, "handlers")

routes.post(
    "/aql",
    aql(service)
)

server.use(json())
server.use(routes.routes())
server.listen(
    1338,
    async () => {
        const response = await fetch(
            "http://localhost:1338/aql",
            {
                method: "POST",
                body: JSON.stringify(paraQuery),
                headers: {
                    "content-type": "application/json"
                }
            }
        )

        console.log(await response.json())
        process.exit(0)
    }
)
