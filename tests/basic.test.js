const engine = require("../index.js")

const {seqQuery, paraQuery} = require("./test.config.js")

process.chdir(__dirname)

const main = async () => {
    const service = await engine("handlers")
    console.log(service)
    {
        const response = await service.execute(["docs"])

        console.group("docs")
        console.log(
            JSON.stringify(response, null, 2)
        )
        console.groupEnd()
    }
    {
        const response = await service.execute(seqQuery)

        console.group("series")
        console.log(seqQuery)
        console.log(
            JSON.stringify(response, null, 2)
        )
        console.groupEnd()
    }
    {
        const response = await service.execute(paraQuery)

        console.group("parallel")
        console.log(paraQuery)
        console.log(
            JSON.stringify(response, null, 2)
        )
        console.groupEnd()
    }
}
main()
