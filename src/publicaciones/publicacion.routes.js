import { Router } from "express";
import { check } from "express-validator";
import {
    postPublicacion,
    getPublicaciones,
    getPublicacionById,
    getPublicacionByTitulo,
    putPublicacion,
    deletePublicacion
} from "./publicacion.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/",
    [
        check("titulo", "El título es obligatorio").not().isEmpty(),
        check("descripcion", "La descripción es obligatoria").not().isEmpty(),
        check("curso", "Debe especificar al menos un curso").isArray({ min: 1 }),
        validarCampos
    ],
    postPublicacion
);

router.get("/", getPublicaciones);

router.get(
    "/:id",
    [
        check("id", "ID inválido").isMongoId(),
        validarCampos
    ],
    getPublicacionById
);

router.get(
    "/titulo/:titulo",
    [
        check("titulo", "El título es obligatorio").not().isEmpty(),
        validarCampos
    ],
    getPublicacionByTitulo
);

router.put(
    "/:id",
    [
        check("id", "ID inválido").isMongoId(),
        validarCampos
    ],
    putPublicacion
);

router.delete(
    "/:id",
    [
        check("id", "ID inválido").isMongoId(),
        validarCampos
    ],
    deletePublicacion
);

export default router;