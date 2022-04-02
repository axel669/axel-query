const engine = require("./src/engine.js")

module.exports = (handlers, rpc = false) =>
    engine(
        "**/*.js",
        handlers,
        (file) => require(file),
        rpc
    )
