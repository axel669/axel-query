const typeInfo = require("./type-info.js")
const listProps = require("./list-props.js")
const mask = require("./mask.js")
const validate = require("./validate.js")

const compile = (def) => {
    const type = typeInfo(def)

    return {
        validate: (data) => {
            validate(data, type)
        },
        mask: (data, queryValue) => {
            const props = listProps(queryValue)
                .filter(prop => type[prop] !== undefined)
            return mask(data, props)
        },
        propList: (queryValue) => listProps(queryValue)
            .filter(prop => type[prop] !== undefined),
        typeInfo: () => type,
        definition: () => def
    }
}

module.exports = compile
