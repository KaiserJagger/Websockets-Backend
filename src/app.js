// app.js
import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars'
import {Server} from 'socket.io';
import  productRouter from './routers/productRoutes.js';
import cartRouter from './routers/cartsRouter.js';
import viewsRouter from './routers/viewsRouter.js'; 
import ProductManager from './managers/productsManager.js';


const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// configuracion de carpeta public (static)
app.use(express.static(__dirname+'/public'))


const socketServer = new Server(httpServer); //handshake

//configuracion del motor de plantillas (dynamic)
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
app.use(express.static('./src/public'))
app.use('/', viewsRouter);

// rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);



socketServer.on('connection', (socket) => {
    console.log('Cliente socket conectado')
  
    // Enviamos los productos existentes cuando el cliente se conecta
    socket.emit('products', ProductManager.getProducts);
  
    // Escuchamos el evento de agregar producto
    socket.on('newProduct', (product) => {
      // Agregamos el nuevo producto al array de productos
      ProductManager.add(product);
      console.log('Nuevo producto agregado:', product);
  
      // Emitimos la señal a todos los clientes conectados, con los nuevos productos
      socketServer.emit('products', ProductManager.getProducts);
    });
  
    // Escuchamos el evento de eliminar producto
    socket.on('deleteProduct', (productId) => {
      // Eliminamos el producto del array de productos
      ProductManager.deleteById(productId);
      console.log('Producto eliminado:', productId);
  
      // Emitimos la señal a todos los clientes conectados, con los nuevos productos
      socketServer.emit('products', ProductManager.getProducts);
    });
  });
