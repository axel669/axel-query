const users = require("../../data/users")

const userSearch = {
    "value[]": {
        "user": "string",
        "perms[]": {
            "name": "string"
        },
        "a": "string",
        "a2": "string",
        "a3": "string",
        "a4": "string",
        "a5": "string",
        "a6": "string",
        "a7": "string",
        "a8": "string",
        "a9": "string",
        "a10": "string",
        "a11": "string",
        "a12": "string",
        "a13": "string",
        "a14": "string",
        "a15": "string",
    },
    args: {
        "user": "string",
        "pw": "string"
    },
    func: async (args, mask) => {
        console.log(mask)
        return users.filter(
            user => user.user === args.user
        )
    }
}

module.exports = userSearch
