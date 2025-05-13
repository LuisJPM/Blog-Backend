import { Router } from "express";
import { check } from "express-validator";
import {postComentario, getComentarios, getComentarioById, getComentarioByPublicacion, putComentario, deleteComentario} from "./comentario.controller.js";
import {idComentarioValido, publicacionConComentarioValida} from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/",
    [
        validarCampos
    ],
    postComentario
);

router.get("/", getComentarios);

router.get(
    "/:id",
    [
        check("id", "¡ID no válido!").isMongoId(),
        check("id").custom(idComentarioValido),
        validarCampos
    ],
    getComentarioById
);

router.get(
    "/publicacion/:titulo",
    [
        validarCampos
    ],
    getComentarioByPublicacion
);

router.put(
    "/:id",
    [
        check("id", "¡ID no válido!").isMongoId(),
        check("id").custom(idComentarioValido),
        validarCampos
    ],
    putComentario
);

router.delete(
    "/:id",
    [
        check("id", "¡ID no válido!").isMongoId(),
        check("id").custom(idComentarioValido),
        validarCampos
    ],
    deleteComentario
);

export default router;

