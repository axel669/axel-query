const glob = require("glob")
const path = require("path")

const compile = require("./compile.js")

const register = (functions, name, def) => {
    const { args, func, ...value } = def

    functions[name] = {
        func,
        args: compile(args),
        value: compile(value),
    }
}

const executeQuery = async (functions, call, query) => {
    const { args, value } = query
    const valueForm = { value }
    const mod = functions[call]

    if (mod === undefined) {
        return {
            error: `Function '${call}' does not exist in the API`
        }
    }

    try {
        const props = mod.value.propList(valueForm)
        const queryValue = {
            value: await mod.func(args, props)
        }

        mod.value.validate(queryValue)

        return mod.value.mask(queryValue, valueForm).value
    }
    catch (err) {
        return {
            error: err.message,
            stack: err.stack
        }
    }
}

const executeSerial = async (functions, query) => {
    const response = {}
    for (const queryItem of query) {
        const [target] = Object.keys(queryItem)
        const [name, call] = target.split(":")
        const result = await executeQuery(functions, call, queryItem[target])
        response[name] = result
    }

    return response
}
const executeParallel = async (functions, query) => {
    const names = Object.keys(query)

    const results = await Promise.all(
        names.map(
            async (target) => {
                const [name, call] = target.split(":")
                return [
                    name,
                    await executeQuery(functions, call, query[target])
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

// const executeUserQuery = (functions, query) => {
//     if (Array.isArray(query) === true) {
//         return executeSerial(functions, query)
//     }

//     return executeParallel(functions, query)
// }

const engine = (root, handlersDir) => {
    const cwd = path.join(root, handlersDir)
    const handlerList = glob.sync(`**/*.js`, { cwd })

    const functions = {}

    for (const file of handlerList) {
        const name = file.slice(0, -3).replace(/\//g, ".")
        register(
            functions,
            name,
            require(
                path.join(cwd, file)
            )
        )
    }

    return {
        execute: (query) => {
            if (Array.isArray(query) === true) {
                return executeSerial(functions, query)
            }

            return executeParallel(functions, query)
        }
    }
}

module.exports = engine
