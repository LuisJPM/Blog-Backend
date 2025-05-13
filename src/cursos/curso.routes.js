import { Router } from "express";
import { check } from "express-validator";
import {postCurso, getCursos, getCursoById, getCursoByNombre, putCurso, deleteCurso} from "./curso.controller.js";
import { idCursoValido,nombreCursoValido} from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/",
    [
        validarCampos
    ],
    postCurso
);

router.get("/", getCursos);

router.get(
    "/:id",
    [
        check("id", "¡ID inválido!").isMongoId(),
        check("id").custom(idCursoValido),
        validarCampos
    ],
    getCursoById
);

router.get(
    "/nombre/:name",
    [
        check("name", "¡El nombre es obligatorio!").not().isEmpty(),
        check("name").custom(nombreCursoValido),
        validarCampos
    ],
    getCursoByNombre
);

router.put(
    "/:id",
    [
        check("id", "¡ID inválido!").isMongoId(),
        check("id").custom(idCursoValido),
        validarCampos
    ],
    putCurso
);

router.delete(
    "/:id",
    [
        check("id", "¡ID inválido!").isMongoId(),
        check("id").custom(idCursoValido),
        validarCampos
    ],
    deleteCurso
);

export default router;
