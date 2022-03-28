const engine = require("./src/engine.js")

module.exports = (handlers) =>
    engine(
        "**/*.js",
        handlers,
        (file) => require(file)
    )
