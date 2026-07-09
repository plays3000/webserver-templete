import express from 'express';
import cors from 'cors';
import routes from './routes';
import {env} from './config/env';
import {
    errorHandler,
    notFoundHandler
} from "./middlewares/errorMiddleware";

export const app = express();

app.use(
    cors({
        origin: env.corsOrigin,
        credentials: true,
    }),
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', routes);
app.use(notFoundHandler);
app.use(errorHandler);