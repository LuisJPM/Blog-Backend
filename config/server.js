'use strict';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validate-cant-peticiones.js';
import publicacionRoutes from '../src/publicaciones/publicacion.routes.js';
import comentarioRoutes from '../src/comentarios/comentario.routes.js';
import cursoRoutes from '../src/cursos/curso.routes.js'; 

const configurarMiddlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
};

const configurarRutas = (app) => {
    app.use('/Blog/publicaciones', publicacionRoutes);
    app.use('/Blog/comentarios', comentarioRoutes);
    app.use('/Blog/cursos', cursoRoutes);
};

const conectarDB = async () => {
    try {
        await dbConnection();
        console.log(' ** Conexión realizada a la base de datos **');
    } catch (error) {
        console.error('Ocurrió un error al intentar conectar con la base de datos', error);
        process.exit(1);
    }
};

export const initServer = async () => {
    const app = express();
    const port = process.env.PORT || 3000;
    await conectarDB();
    configurarMiddlewares(app);
    configurarRutas(app);
    app.listen(port, () => {
        console.log('      ----------------------------');
        console.log(`     | Server running on port ${port} |`);
        console.log('      ----------------------------');
    });
};
