import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { authRouter } from './routes/auth';
import { DataSource } from 'typeorm';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', authRouter);

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_CONFIG_HOST,
    port: process.env.DB_CONFIG_PORT as number | undefined,
    username: process.env.DB_CONFIG_USERNAME,
    password: process.env.DB_CONFIG_PASSWORD,
    database: process.env.DB_CONFIG_DATABASE,
    entities: ['./src/models/entity/*.ts'],
    migrations: ['./src/models/migrations/*.ts'],
});

export const connection = AppDataSource.initialize();

AppDataSource.initialize().then(() => {
    console.log('Banco conectado');
    app.listen(process.env.PORT || 3000, (): void => {
        console.log(
            `Server is running in the port ${process.env.PORT || 3000}`,
        );
    });
});
