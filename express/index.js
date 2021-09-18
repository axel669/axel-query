const aqExpress = service =>
    async (req, res) => {
        const result = await service.execute(req.body)

        res.json(result)
    }

module.exports = aqExpress
