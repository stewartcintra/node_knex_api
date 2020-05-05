const api = require('../services/api');

module.exports = {
    async find(req, res) {
        const { cep } = req.params;
    
        if (cep.length !== 8) {
            return res.status(400).json({ msg: 'Cep informado errado.' })
        }
    
        try {
    
            const response = await api.get(`/${cep}/json/`);
            res.status(200).json(response.data);
            
        } catch(err) {
            res.status(400).json({ msg: 'Erro ao buscar o cep.' });
        }
    },
};