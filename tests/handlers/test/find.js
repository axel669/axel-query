const users = require("../../data/users")

const userSearch = {
    "value[]": {
        "user": "string",
        "perms[]": {
            "name": "string"
        }
    },
    args: {
        "user": "string",
        "pw": "string"
    },
    func: async (args, mask) => {
        // console.log(mask)
        return users.filter(
            user => user.user === args.user
        )
    }
}

module.exports = userSearch
