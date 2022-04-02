import url from "url"

import engine from "./src/engine.js"

export default function(handlers, rpc = false) {
    return engine(
        "**/*.{mjs,js}",
        handlers,
        async (file) => {
            const source = await import(
                url.pathToFileURL(file)
            )
            return source.default
        },
        rpc
    )
}
