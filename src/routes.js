const express = require('express');

const CepController = require('./controllers/CepController');
const ProductsController = require('./controllers/ProductsController');

const routes = express.Router();

routes.get('/cep/:cep', CepController.find);

routes.get('/products', ProductsController.index);
routes.get('/products/:id', ProductsController.store);
routes.post('/products', ProductsController.create);
routes.put('/products/:id', ProductsController.update);
routes.delete('/products/:id', ProductsController.destroy);

module.exports = routes;