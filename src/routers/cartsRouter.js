import express from 'express';
import CartManager from '../managers/cartsManager.js';

const router = express.Router();
const cartManager = new CartManager();

router.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    if (!newCart) {
      return res.status(400).json({ error: 'Error al crear el carrito' });
    }
    res.status(200).json(newCart);
  });
  
  router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    if (!cart) {
      return res.status(404).json({ error: 'No se encontró el carrito' });
    }
    res.status(200).json(cart);
  });
  
  router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const product = await cartManager.addProductToCart(cid, pid, quantity);
    if (!product) {
      return res.status(404).json({ error: 'No se encontró el carrito o el producto' });
    }
    res.status(200).json(product);
  });
  
  export default router;
  
  