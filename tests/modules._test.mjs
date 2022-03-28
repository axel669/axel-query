import engine from "../esm.mjs"

export async function test({ Section, Assert }) {
    Section("setup")

    const service = await engine("handlers")

    Section("get docs")
    const response = await service.execute(["docs"])

    const clientPreview = JSON.parse(
        JSON.stringify(response)
    )
    Assert(clientPreview["test.find"], {
        "args.user:eq": "string",
        "args.pw:eq": "string",
    })
    Assert(clientPreview["test2.find"], {
        "value.value[].user:eq": "string",
        "value.value[].a15:eq": "string",
    })
    Assert(clientPreview["test.module"], {
        "value.value[].user:eq": "string",
        "args.id:eq": "number",
    })
}
