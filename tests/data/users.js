const users = [
    {
        user: "axel",
        pw: "test",
        perms: [
            { name: "edit"},
            { name: "save"},
            { name: "delete"},
        ]
    },
    {
        user: "test",
        pw: "nope",
        perms: [
            {name: "edit"},
            {name: "save"},
        ]
    }
]

module.exports = users
