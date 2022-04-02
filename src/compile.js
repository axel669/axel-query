const typeInfo = require("./type-info.js")
const listProps = require("./list-props.js")
const mask = require("./mask.js")
const validate = require("./validate.js")

const compile = (def) => {
    const type = typeInfo(def)

    const topLevel = Object.values(type).filter(i => i.top)
    const typeProps = Object.keys(type)

    return {
        validate: (data) => {
            validate(data, type)
        },
        mask: (data, queryValue, rpc) => {
            if (rpc === true) {
                return mask(data, typeProps)
            }
            
            const props = listProps(queryValue)
                .filter(prop => type[prop] !== undefined)
            return mask(data, props)
        },
        propList: (queryValue) => listProps(queryValue)
            .filter(prop => type[prop] !== undefined),
        typeInfo: () => type,
        definition: () => def,
        toJSON: () => def,
        filter: (args) => topLevel.reduce(
            (newArgs, info) => {
                const {name} = info
                const value = args[name] ?? null

                if (info.nullable === false && value === null) {
                    throw new Error(
                        `Argument '${name}' cannot be null`
                    )
                }
                newArgs[name] = value
                return newArgs
            },
            {}
        )
    }
}

module.exports = compile
