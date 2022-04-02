// const glob = require("glob")
const glob = require("fast-glob")
const path = require("path")

const compile = require("./compile.js")

const register = (functions, name, def) => {
    const [baseName] = name.split(".").slice(-1)

    if (baseName.startsWith("$")) {
        return
    }

    const { args, func, ...value } = def

    functions[name] = {
        func,
        args: compile(args),
        value: compile(value),
    }
}

const executeQuery = async (functions, call, query, context, rpc) => {
    const { args, value } = query
    const valueForm = { value }
    const mod = functions[call]

    if (mod === undefined) {
        return {
            error: `Function '${call}' does not exist in the API`
        }
    }

    try {
        const funcArgs = mod.args.filter(rpc ? query : args)
        mod.args.validate(funcArgs)
        const props = mod.value.propList(valueForm)
        const queryValue = {
            value: await mod.func(funcArgs, context, props)
        }

        mod.value.validate(queryValue)

        return mod.value.mask(queryValue, valueForm, rpc)
    }
    catch (err) {
        return {
            error: err.message,
            // stack: err.stack
        }
    }
}

const executeSerial = async (functions, query, context, rpc) => {
    const response = {}
    for (const queryItem of query) {
        const [target] = Object.keys(queryItem)
        const [name, call] = target.split(":")
        const result = await executeQuery(
            functions,
            call,
            queryItem[target],
            context,
            rpc
        )
        response[name] = result
    }

    return response
}
const executeParallel = async (functions, query, context, rpc) => {
    const names = Object.keys(query)

    const results = await Promise.all(
        names.map(
            async (target) => {
                const [name, call] = target.split(":")
                return [
                    name,
                    await executeQuery(
                        functions,
                        call,
                        query[target],
                        context,
                        rpc
                    )
                ]
            }
        )
    )

    return results.reduce(
        (res, [name, result]) => {
            res[name] = result
            return res
        },
        {}
    )
}

const engine = async (pattern, handlersDir, load, rpc) => {
    const cwd = path.resolve(
        process.cwd(),
        handlersDir
    )
    const handlerList = await glob(pattern, { cwd })

    const functions = {}

    for (const file of handlerList) {
        const name = file.replace(/\.m?js$/, "").replace(/\//g, ".")
        register(
            functions,
            name,
            await load(
                path.join(cwd, file)
            )
        )
    }

    return {
        execute: (query, context) => {
            if (Array.isArray(query) === true) {
                if (query[0] === "docs") {
                    return functions
                }
                return executeSerial(functions, query, context, rpc)
            }

            return executeParallel(functions, query, context, rpc)
        }
    }
}

module.exports = engine
