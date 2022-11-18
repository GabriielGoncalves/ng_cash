import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { authRouter } from './routes/auth';
import { AppDataSource } from './models/database/data-source';
import { accountRouter } from './routes/account';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', authRouter, accountRouter);

AppDataSource.initialize()
    .then(() => {
        console.log('Banco conectado');
        app.listen(process.env.PORT || 3000, (): void => {
            console.log(
                `Server is running in the port ${process.env.PORT || 3000}`,
            );
        });
    })
    .catch((err) => {
        console.log(err);
        throw new Error(err);
    });
