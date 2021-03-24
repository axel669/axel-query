const compile = require("./compile.js")

const register = (functions, def) => {
    const { name, args, func, ...value } = def

    functions[name] = {
        func,
        args: compile(args),
        value: compile(value),
    }
}

const executeQuery = async (functions, query) => {
    const { call, args, value } = query
    const valueForm = { value }
    const mod = functions[call]

    if (mod === undefined) {
        // throw new Error(`Function '${call}' does not exist in the API`)
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

        return mod.value.mask(queryValue, valueForm)
    }
    catch (err) {
        return {
            error: err.message,
            stack: err.stack
        }
    }
}

const executeSerial = async (functions, query) => {
    const { sequence, exec } = query

    const response = {}
    for (const name of sequence) {
        const result = await executeQuery(functions, exec[name])
        response[name] = result
    }

    return response
}
const executeParallel = async (functions, query) => {
    const { exec } = query
    const names = Object.keys(exec)

    const results = await Promise.all(
        names.map(
            async (name) => [
                name,
                await executeQuery(functions, exec[name])
            ]
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

const executeUserQuery = (functions, query) => {
    if (query.sequence !== undefined) {
        return executeSerial(functions, query)
    }

    return executeParallel(functions, query)
}

const engine = () => {
    const functions = {}

    return {
        register: (def) => register(functions, def),
        execute: (query) => executeUserQuery(functions, query)
    }
}

module.exports = engine
