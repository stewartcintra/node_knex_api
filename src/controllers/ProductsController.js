const connection = require('../database/connection');
const { uuid } = require('uuidv4');

module.exports = {
    async index(req, res) {
    
        const products = await connection('products').select();
    
        return res.json(products);
    },

    async store(req, res) {
        const { id } = req.params;

        const product = await connection('products').select().where('id', id).first();

        return res.json(product);
    },

    async create(req, res) {
        const { product, description, price, amount, active } = req.body;
        const id = uuid();

        try {
            await connection('products').insert({
                id,
                product,
                description,
                price,
                amount,
                active,
            });
            
            const productReponse = await connection('products').where('id', id).select().first();
            
            return res.json(productReponse);
        
        } catch(err) {
            return res.status(400).json({ msg: 'Erro ao criar o produto.' });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { product, description, price, amount, active } = req.body;

        try {
            const productUpdate = await connection('products').where('id', id).update({
                product,
                description,
                price,
                amount,
                active,
            });

            if (productUpdate === 0) {
                return res.status(400).json({ msg: 'Produto não encontrado.' });
            };

            const productReponse = await connection('products').where('id', id).select().first();
    
            return res.send(productReponse);

        } catch(err)  {
            return res.status(500).json({ msg: 'Erro ao editar o produto.' });
        }

    },

    async destroy(req, res) {
        const { id } = req.params;

        try {
            const product = await connection('products').where('id', id).delete();

            if (product === 0) {
                return res.status(400).json({ msg: 'Produto não encontrado.' });
            };

            //return res.status(204).send();
            return res.json({ msg: 'Produto deletado com sucesso.' });

        } catch(err) {
            return res.json({ msg: 'Erro do deletar produto.' });
        }
    },
};