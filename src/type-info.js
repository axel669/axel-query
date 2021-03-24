const typeInfo = (obj, parent = "") => {
    const info = {}

    for (const [key, value] of Object.entries(obj)) {
        const name = key.match(/(\w|\d)+/)[0]
        const longName = `${parent}.${name}`

        const nullable = key.startsWith("?")
        const nullableArray = key.includes("[?]")
        const array = nullableArray || key.includes("[]")
        info[longName] = {
            name,
            nullable,
            array,
            nullableArray,
            type: (typeof value === "string") ? value : null
        }
        const child = (typeof value === "object")
            ? typeInfo(value, longName)
            : {}
        Object.assign(info, child)
    }

    return Object.freeze(info)
}

module.exports = typeInfo
