const aqExpress = (service, context = () => {}) =>
    async (req, res) => {
        const result = await service.execute(req.body, context())

        res.json(result)
    }

module.exports = aqExpress
