export default {
    "args": {},
    "value": "unsafeAny",
    async func(args, context) {
        return {
            wat: [1, 2, 3, "four"],
            [Math.random()]: "nope"
        }
    }
}
