export default {
    "args": {
        pass: "unsafeAny",
    },
    "value": {
        wat: "unsafeAny",
        test: "string"
    },
    async func(args, context) {
        return {
            wat: [1, 2, 3, "four"],
            test: args.pass
        }
    }
}
