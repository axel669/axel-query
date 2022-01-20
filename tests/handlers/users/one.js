const users = require("../../data/users")

module.exports = {
    args: {
        "user": "string"
    },
    "?value": {
        "user": "string"
    },
    func: (args) => {
        return users.find(
            user => user.user === args.user
        ) ?? null
    }
}
