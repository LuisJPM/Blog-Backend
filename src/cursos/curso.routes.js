import { Router } from "express";
import { check } from "express-validator";
import { postCurso, getCursos, getCursoById, getCursoByNombre, putCurso, deleteCurso } from "./curso.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        validarCampos
    ],
    postCurso
);

router.get("/", getCursos);

router.get(
    "/:id",
    [
        check("id", "ID inválido").isMongoId(),
        validarCampos
    ],
    getCursoById
);

router.get(
    "/nombre/:name",
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        validarCampos
    ],
    getCursoByNombre
);

router.put(
    "/:id",
    [
        check("id", "ID inválido").isMongoId(),
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        validarCampos
    ],
    putCurso
);

router.delete(
    "/:id",
    [
        check("id", "ID inválido").isMongoId(),
        validarCampos
    ],
    deleteCurso
);

export default router;