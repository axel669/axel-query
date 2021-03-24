const maskValue = (value, list, name) => {
    if (typeof value !== "object" || value === null || value === undefined) {
        return value
    }

    return mask(value, list, name)
}
const mask = (obj, list, parent = "") => {
    const dest = {}

    for (const [key, value] of Object.entries(obj)) {
        const name = `${parent}.${key}`

        if (list.includes(name) === true) {
            dest[key] = Array.isArray(value)
                ? value.map(
                    item => maskValue(item, list, name)
                )
                : maskValue(value, list, name)
        }
    }

    return dest
}

module.exports = mask
