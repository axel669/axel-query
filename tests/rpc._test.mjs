import engine from "../esm.mjs"

export async function test({ Section, Assert }) {
    Section("Setup")

    const service = await engine("handlers", true)

    Section("Test RPC")

    const result = await service.execute({
        "user:test.find": {
            user: "axel",
            pw: "test",
        },
        "unsafe:test.unsafe": {},
        "nestedUnsafe:test.unsafe-inner": {
            pass: "woah"
        },
        "nestedUnsafeFail:test.unsafe-inner": {
            pass: 10
        },
    })

    Assert(result.user.value, {
        "length:eq": 1
    })
    Assert(result.user.value[0], {
        "user:eq": "axel",
        "perms.1.name:eq": "save"
    })

    Assert(result.unsafe.value, {
        "wat.length:eq": 4,
        "wat.3:eq": "four"
    })
    Assert(Object.keys(result.unsafe.value), {
        "length:eq": 2
    })

    Assert(result.nestedUnsafe.value, {
        "wat.length:eq": 4,
        "test:eq": "woah"
    })
    Assert(result.nestedUnsafeFail, {
        "error:ne": undefined,
        "value:eq": undefined
    })
}
