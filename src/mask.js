const maskValue = (value, list, type, name) => {
    if (type[name]?.type === "unsafeAny") {
        return value
    }
    if (typeof value !== "object" || value === null || value === undefined) {
        return value
    }

    return mask(value, list, type, name)
}
const mask = (obj, list, type, parent = "") => {
    const dest = {}

    for (const [key, value] of Object.entries(obj)) {
        const name = `${parent}.${key}`

        if (list.includes(name) === true) {
            dest[key] = Array.isArray(value)
                ? value.map(
                    item => maskValue(item, list, type, name)
                )
                : maskValue(value, list, type, name)
        }
    }

    return dest
}

module.exports = mask
