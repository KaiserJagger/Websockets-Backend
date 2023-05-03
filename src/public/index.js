import { router as viewsRouter } from './routes/viewsRouter.js';

let socket

app.use('/', viewsRouter);

const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');

productForm.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('Se ha enviado el formulario');
  const formData = new FormData(event.target);
  const product = {
    title: formData.get('title'),
    description: formData.get('description'),
    price: formData.get('price'),
    thumbnail: formData.get('thumbnail'),
    code: formData.get('code'),
    stock: formData.get('stock')
  };
  socket.emit('newProduct', product);
  event.target.reset();
});

socket.on('products', (ProductManager) => {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';
  ProductManager.products.forEach((product) => {
    const li = document.createElement('li');
    li.setAttribute('data-product-id', product.id);
    li.textContent = `${product.title} - ${product.price}`;
    productList.appendChild(li);
  });
});

socket.on('newProduct', (product) => {
  const li = document.createElement('li');
  li.setAttribute('data-product-id', product.id);
  li.textContent = `${product.title} - ${product.price}`;
  productList.appendChild(li);
});

socket.on('deleteProduct', (productId) => {
  const li = productList.querySelector(`li[data-product-id="${productId}"]`);
  productList.removeChild(li);
});

const addProductForm = document.getElementById('add-product-form');
addProductForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const product = {
    title: formData.get('title'),
    description: formData.get('description'),
    price: formData.get('price'),
    thumbnail: formData.get('thumbnail'),
    code: formData.get('code'),
    stock: formData.get('stock')
  };
  socket.emit('newProduct', product);
  event.target.reset();
});
