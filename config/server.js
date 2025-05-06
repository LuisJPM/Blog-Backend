'use strict';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import {dbConnection} from './mongo.js';
import limiter from '../src/middlewares/validate-cant-peticiones.js';
 
const configurarMiddlewares = (app) => {
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}
 
const configurarRutas = () => {
}
 
const conectarDB = async  () => {
    try{
        await dbConnection();
        console.log("**Conexion realizada a la base de datos**");
    }catch(error){
        console.error('Ocurrio un error al intentar conectar con la base de datos', error);
        process.exit(1);
    }
}
 
export const initServer = async () => {
    const app = express();
    const port = process.env.PORT || 3000;
    await conectarDB();
    configurarMiddlewares(app);
    configurarRutas(app);
    app.listen(port, () => {
        console.log(" ----------------------------")
        console.log(`| Server running on port ${port} |`);
        console.log(" ----------------------------")
    });
 
}