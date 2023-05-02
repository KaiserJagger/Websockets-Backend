// app.js
import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars'
import {Server} from 'socket.io';
import  productRouter from './routers/productRoutes.js';
import cartRouter from './routers/cartsRouter.js';
import viewsRouter from './routers/viewsRouter.js'; 


const app = express();
const port = 8080

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// configuracion de carpeta public (static)
app.use(express.static(__dirname+'/public'))


const httpServer = app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

const socketServer = new Server(httpServer); //handshake

//configuracion del motor de plantillas (dynamic)
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
// app.use(express.static('./src/public'))
app.use('/', viewsRouter);

// rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

socketServer.on('connection', () => {
    console.log(port, 'Cliente socket conectado')
})
