import fs from 'fs/promises';

export class CartManager {
  constructor() {
    this.path = './Data/carts.json';
    this.carts = [];
    this.loadCarts();
  }

  async loadCarts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      if (data) {
        this.carts = JSON.parse(data);
      }
    } catch (error) {
      console.error(`Error al leer archivo de carritos: ${error}`);
    }
  }

  async saveCarts() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.carts, null, '\t'));
    } catch (error) {
      console.error(`Error al guardar archivo de carritos: ${error}`);
    }
  }

  async createCart() {
    const newId = this.carts.length + 1;
    const newCart = {
      id: newId,
      timestamp: Date.now(),
      products: [],
    };
    this.carts.push(newCart);
    await this.saveCarts();
    return newCart;
  }

  async getCartById(id) {
    const cart = this.carts.find((c) => c.id === Number(id));
    return cart || null;
  }

  async addProductToCart(cartId, productId, quantity) {
    const cart = await this.getCartById(cartId);
    if (!cart) {
      return null;
    }
    const index = cart.products.findIndex((p) => p.product === productId);
    if (index === -1) {
      cart.products.push({ product: productId, quantity });
    } else {
      cart.products[index].quantity += quantity;
    }
    await this.saveCarts();
    return cart.products;
  }
}

export default CartManager;
