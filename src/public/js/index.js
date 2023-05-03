const socket = io();

  socket.on('products', (products) => {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';

    products.forEach((product) => {
      const li = document.createElement('li');
      li.innerText = product.title;
      productsList.appendChild(li);
    });
  });