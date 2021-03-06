const engine = require("../index.js")

const {seqQuery, paraQuery} = require("./test.config.js")

const service = engine(__dirname, "handlers")
console.log(service)

const main = async () => {
    {
        const response = await service.execute(seqQuery)

        console.group("series")
        console.log(
            JSON.stringify(response, null, 2)
        )
        console.groupEnd()
    }
    {
        const response = await service.execute(paraQuery)

        console.group("parallel")
        console.log(
            JSON.stringify(response, null, 2)
        )
        console.groupEnd()
    }
}
main()
