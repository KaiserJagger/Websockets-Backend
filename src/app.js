// app.js
import express from 'express';
import  productRouter from './routers/productRoutes.js';
import cartRouter from './routers/cartsRouter.js';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
