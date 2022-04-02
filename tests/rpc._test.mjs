import engine from "../esm.mjs"

export async function test({ Section, Assert }) {
    Section("Setup")

    const service = await engine("handlers", true)

    Section("Test RPC")

    const result = await service.execute({
        "user:test.find": {
            user: "axel",
            pw: "test",
        }
    })

    Assert(result.user.value, {
        "length:eq": 1
    })
    Assert(result.user.value[0], {
        "user:eq": "axel",
        "perms.1.name:eq": "save"
    })
}
