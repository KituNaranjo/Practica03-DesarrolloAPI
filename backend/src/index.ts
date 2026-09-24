import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDatabase } from './config/database.js';
import empleadosRouter from './routes/empleados.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();
const port = 3000;

connectDatabase();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/api/v1', empleadosRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log('Servidor escuchando en el puerto ' + port);
});