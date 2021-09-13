const seqQuery = [
    {
        "test:users.find": {
            args: {
                user: "axel"
            },
            value: {
                user: true,
                perms: true,
                pw: true,
            }
        }
    },
    {
        "test2:users.find": {
            args: {
                user: "test"
            },
            value: {
                user: true,
            }
        }
    },
]
const paraQuery = {
    "test:users.find": {
        args: {
            user: "axel"
        },
        value: {
            user: true,
            perms: true,
            pw: true,
        }
    },
    "test2:users.find": {
        args: {
            user: "test"
        },
        value: {
            user: true,
        }
    },
}

module.exports = {
    seqQuery,
    paraQuery,
}
