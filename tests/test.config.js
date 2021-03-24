const users = [
    {
        user: "axel",
        pw: "test",
        perms: [
            "edit",
            "save",
            "delete"
        ]
    },
    {
        user: "test",
        pw: "nope",
        perms: [
            "edit",
            "save"
        ]
    }
]
const userSearch = {
    name: "findUsers",
    "value[]": {
        user: "string",
        "perms[]": "string"
    },
    args: {
        "?user": "string",
        "?pw": "string"
    },
    func: async (args, mask) => {
        return users.filter(
            user => user.user === args.user
        )
    }
}

const seqQuery = {
    sequence: ["test", "test2"],
    exec: {
        test: {
            call: "findUsers",
            args: {
                user: "axel"
            },
            value: {
                user: true,
                perms: true,
                pw: true,
            }
        },
        test2: {
            call: "findUsers",
            args: {
                user: "test"
            },
            value: {
                user: true,
            }
        },
    }
}
const paraQuery = {exec: seqQuery.exec}

module.exports = {
    seqQuery,
    paraQuery,
    users,
    userSearch
}
