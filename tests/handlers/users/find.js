const users = require("../../data/users")

const userSearch = {
    "value[]": {
        "user": "string",
        "perms[]": {
            "name": "string"
        }
    },
    args: {
        "?user": "string",
        "?users[]": "string",
        "pw": "string",
    },
    func: async (args, mask) => {
        if (args.users !== undefined) {
            return users.filter(
                user => args.users.includes(user.user)
            )
        }
        return users.filter(
            user => user.user === args.user
        )
    }
}

module.exports = userSearch
