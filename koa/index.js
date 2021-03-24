const koaAQL = service =>
    async (ctx, next) => {
        ctx.response.body = await service.execute(ctx.request.body)
    }

module.exports = koaAQL
