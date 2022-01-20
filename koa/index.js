const koaAQL = (service, context = () => {}) =>
    async (ctx, next) => {
        ctx.response.body = await service.execute(
            ctx.request.body,
            context()
        )
    }

module.exports = koaAQL
