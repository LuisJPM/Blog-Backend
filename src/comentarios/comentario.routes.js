import { Router } from "express";
import { check } from "express-validator";
import { postComentario, getComentarios, getComentarioById, getComentarioByPublicacion, putComentario, deleteComentario } from "./comentario.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/",
    [
        check("nombreAutor", "El nombre es requerido").not().isEmpty(),
        check("contenido", "El contenido es requerido").not().isEmpty(),
        check("publicacion", "La publicación es requerida").not().isEmpty(),
        validarCampos
    ],
    postComentario
);

router.get("/", getComentarios);

router.get(
    "/:id",
    [
        check("id", "El ID no es válido").isMongoId(),
        validarCampos
    ],
    getComentarioById
);

router.get(
    "/publicacion/:title",
    [
        check("title", "El título es requerido").not().isEmpty(),
        validarCampos
    ],
    getComentarioByPublicacion
);

router.put(
    "/:id",
    [
        check("id", "El ID no es válido").isMongoId(),
        check("nombreAutor", "El nombre es requerido").optional().not().isEmpty(),
        check("contenido", "El contenido es requerido").optional().not().isEmpty(),
        check("publicacion", "La publicación es requerida").optional().not().isEmpty(),
        validarCampos
    ],
    putComentario
);

router.delete(
    "/:id",
    [
        check("id", "El ID no es válido").isMongoId(),
        validarCampos
    ],
    deleteComentario
);

export default router;