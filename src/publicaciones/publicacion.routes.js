import { Router } from "express";
import { check } from "express-validator";
import {postPublicacion, getPublicaciones, getPublicacionById, getPublicacionByTitulo, putPublicacion, deletePublicacion} from "./publicacion.controller.js";
import {idPublicacionValida, tituloPublicacionValido} from "../helpers/db-validator.js";

import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

// Crear publicación
router.post(
    "/",
    [
        validarCampos
    ],
    postPublicacion
);

// Obtener todas las publicaciones
router.get("/", getPublicaciones);

// Obtener publicación por ID
router.get(
    "/:id",
    [
        check("id", "¡ID inválido!").isMongoId(),
        check("id").custom(idPublicacionValida),
        validarCampos
    ],
    getPublicacionById
);

// Obtener publicación por título
router.get(
    "/titulo/:titulo",
    [
        check("titulo", "¡El título es obligatorio!").not().isEmpty(),
        check("titulo").custom(tituloPublicacionValido),
        validarCampos
    ],
    getPublicacionByTitulo
);

// Actualizar publicación
router.put(
    "/:id",
    [
        check("id", "¡ID inválido!").isMongoId(),
        check("id").custom(idPublicacionValida),
        validarCampos
    ],
    putPublicacion
);

// Eliminar (desactivar) publicación
router.delete(
    "/:id",
    [
        check("id", "¡ID inválido!").isMongoId(),
        check("id").custom(idPublicacionValida),
        validarCampos
    ],
    deletePublicacion
);

export default router;
