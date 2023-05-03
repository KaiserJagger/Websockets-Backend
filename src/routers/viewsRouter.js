import express from 'express';
import  ProductManager  from '../managers/productsManager.js';

const router = express.Router();
const productManager = new ProductManager();

router.get('/', (req, res) => {
  const products = productManager.getProducts();
  res.render('home', { products });
});

router.get('/realtimeproducts', (req, res) => {
  const products = productManager.getProducts();
  res.render('realTimeProducts', { products });
});

router.post('/realtimeproducts', (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  const newProduct = productManager.addProduct(title, description, price, thumbnail, code, stock);
  res.sendStatus(201);
});

export default router;
