import fs from 'fs/promises';

class ProductManager {
    constructor() {
      this.index = 0;
      this.path = './Data/products.json';
      this.getProducts().then(products => this.products = products);
    }

  async getProducts() {
    try {
      const productsList = await fs.readFile(this.path, 'utf-8');
      const products = JSON.parse(productsList);
      this.index = products.length;
      return products;
    } catch (error) {
      console.error(`Error al cargar productos: ${error}`);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const productsList = await fs.readFile(this.path, 'utf-8');
      const products = JSON.parse(productsList);
      const product = products.find((product) => product.id == id)
      if (!product) {
        console.log(`No se encontró el producto con la siguiente ID: ${id}`);
        return null;
      }
      return product;
    } catch (error) {
      console.error(`Error al cargar productos: ${error}`);
      return null;
    }
  }
  
  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Error, faltan datos");
      return null;
    }
  
    const index = this.products.findIndex((p) => p.code === code);
    if (index !== -1) {
      console.error("Error, hay un código igual");
      return null;
    }
  
    const id = this.products.length + 1;
    const product = { id, title, description, price, thumbnail, code, stock };
    this.products.push(product);
  
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
    } catch (error) {
      console.error(`Error al guardar producto: ${error}`);
      return null;
    }
  
    return product;
  }
  

  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      console.error(`Error: El producto con id ${id} no existe`);
      return null;
    }

    const updatedProduct = { id, title, description, price, thumbnail, code, stock };
    this.products = this.products.map((product) => (product.id === id ? updatedProduct : product));
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
    } catch (error) {
      console.error(`Error al actualizar producto: ${error}`);
      return null;
    }
    return updatedProduct;
  }

  async deleteProduct(id) {
    const productIndex = this.products.findIndex((product) => product.id == id);
    if (productIndex === -1) {
      console.error(`Error: El producto con id ${id} no existe`);
      return null;
    }

    this.products.splice(productIndex, 1);
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
    } catch (error) {
      console.error(`Error al eliminar producto: ${error}`);
      return null;
    }
    return true;
  }
}

export default ProductManager;
