const typeValidator = {
    "int": value => (
        typeof value === "number"
        && (value % 1) === 0
    ),
    "number": value => typeof value === "number",
    "string": value => typeof value === "string",
    "bool": value => typeof value === "boolean",
}

const validateItem = (item, typeInfo, name) => {
    const propInfo = typeInfo[name]
    if (propInfo.nullable === false && (item === null || item === undefined)) {
        throw new Error(`Invalid: ${name}, null`)
    }

    if (propInfo.type === null) {
        return validate(item, typeInfo, name)
    }

    typeValidator[propInfo.type](item)
}
const validateArray = (array, typeInfo, name, nullableItems) => {
    for (const item of array) {
        if (item === null || item === undefined) {
            if (nullableItems === false) {
                throw new Error(`Invalid Array Item: ${name}, null`)
            }

            return
        }
        validate(item, typeInfo, name)
    }
}
const validate = (obj, typeInfo, parent = "") => {
    for (const [key, value] of Object.entries(obj)) {
        const propName = `${parent}.${key}`
        const propInfo = typeInfo[propName]

        if (propInfo !== undefined) {
            propInfo.array
                ? validateArray(
                    value,
                    typeInfo,
                    propName,
                    propInfo.nullableArray
                )
                : validateItem(value, typeInfo, propName)
        }
    }
}

module.exports = validate
