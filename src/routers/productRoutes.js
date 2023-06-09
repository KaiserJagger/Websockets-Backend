import express from 'express';
import  ProductManager  from '../managers/productsManager.js';
import { Server } from 'socket.io';
const router = express.Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { products });
});

router.get('/:pid', async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);
    if (!product) {
      return res.status(404).json({ error: `No se encontró el producto con la siguiente ID: ${req.params.pid}` });
    }
    res.send(product);
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${req.params.pid}: ${error}`);
    res.status(500).json({ error: 'Ocurrió un error al obtener el producto' });
  }
});


router.post('/', async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  const newProduct = await productManager.addProduct(title, description, price, thumbnail, code, stock);
  if (!newProduct) {
    return res.status(400).json({ error: 'Faltan datos o el código ya existe' });
  }
  res.status(200).json(newProduct);
});

router.put('/:pid', async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  const updatedProduct = await productManager.updateProduct(req.params.pid, title, description, price, thumbnail, code, stock);
  if (!updateProduct) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(updatedProduct);
  io.emit('update');
});

router.delete('/:pid', async (req, res) => {
  const result = await productManager.deleteProduct(req.params.pid);
  if (!result) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json({ message: 'Producto eliminado correctamente' });
  io.emit('update');
});

export default router;
