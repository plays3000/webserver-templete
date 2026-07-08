import express from 'express';
import {healthRouter, calculatorRouter} from './routes/index.js';
import { addTimestamp, logger, errorHandler } from './middlewares/index.js'
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.BACKEND_PORT;

app.use(express.json())
app.use(addTimestamp);
app.use(logger);

app.use('/health', healthRouter);
app.use('/calculator', calculatorRouter);

app.use(errorHandler);

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`)
});