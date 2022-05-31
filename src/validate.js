const typeValidator = {
    "int": value => (
        typeof value === "number"
        && (value % 1) === 0
    ),
    "number": value => typeof value === "number",
    "string": value => typeof value === "string",
    "bool": value => typeof value === "boolean",
    "unsafeAny": () => true,
}

const validateItem = (item, typeInfo, name) => {
    const propInfo = typeInfo[name]
    if (item === null || item === undefined) {
        if (propInfo.nullable === false) {
            throw new Error(`Invalid: ${name}, null`)
        }
        return
    }

    if (propInfo.type === null) {
        return validate(item, typeInfo, name)
    }

    // console.log("validate", item, name, propInfo)
    if (typeValidator[propInfo.type](item) === false) {
        throw new Error(`${name} expected to be "${propInfo.type}": ${item}`)
    }
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
    const invalidObject = (
        typeInfo.nullable === false
        && (
            typeof obj !== "object"
            || Array.isArray(obj)
        )
    )
    if (invalidObject === true) {
        throw new Error(`Expected ${parent} to not be null`)
    }
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
