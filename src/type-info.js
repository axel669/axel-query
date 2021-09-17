const typeInfo = (obj, parent = "") => {
    const info = {}

    for (const [key, value] of Object.entries(obj)) {
        const name = key.match(/(\w|\d)+/)[0]
        const longName = `${parent}.${name}`

        const nullable = key.startsWith("?")
        const nullableArray = key.endsWith("[?]")
        const array = nullableArray || key.endsWith("[]")
        info[longName] = {
            name,
            nullable,
            array,
            nullableArray,
            type: (typeof value === "string") ? value : null,
            top: parent === ""
        }
        const child = (typeof value === "object")
            ? typeInfo(value, longName)
            : {}
        Object.assign(info, child)
    }

    return Object.freeze(info)
}

module.exports = typeInfo
