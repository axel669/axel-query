const configure = (options = {}) => {
    const {
        domain = null,
        route = "/aq",
    } = options

    const url = (domain === null)
        ? route
        : `${domain}${route}`

    return async (query, headers = {}) => {
        const response = await fetch(
            url,
            {
                method: "POST",
                headers: {
                    ...headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(query)
            }
        )

        return await response.json()
    }
}
configure.run = configure()

module.exports = configure
