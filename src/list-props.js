const listProps = (obj, list = [], parent = "") => {
    for (const [key, type] of Object.entries(obj)) {
        if (type !== false) {
            const propName = `${parent}.${key}`
            list.push(propName)

            if (typeof type === "object") {
                listProps(type, list, propName)
            }
        }
    }

    return list
}

module.exports = listProps
