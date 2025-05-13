import Publicacion from '../publicaciones/publicacion.model.js';
import Course from "../cursos/curso.model.js";
import Comentario from "../comentarios/comentario.model.js";

export const idPublicacionValida = async (id = '') => {
    const existe = await Publicacion.findById(id);
    if (!existe) {
        throw new Error(`La publicación con ID ${id} no existe en la base de datos.`);
    }
}

export const tituloPublicacionValido = async (titulo = '') => {
    const existe = await Publicacion.findOne({ titulo });
    if (!existe) {
        throw new Error(`La publicación con título "${titulo}" no existe.`);
    }
}

export const idCursoValido = async (id = '') => {
    const existe = await Course.findById(id);
    if (!existe) {
        throw new Error(`El curso con ID ${id} no existe.`);
    }
}

export const nombreCursoValido = async (name = '') => {
    const existe = await Course.findOne({ name });
    if (!existe) {
        throw new Error(`El curso con nombre "${name}" no existe.`);
    }
}

export const idComentarioValido = async (id = '') => {
    const existe = await Comentario.findById(id);
    if (!existe) {
        throw new Error(`El comentario con ID ${id} no existe.`);
    }
}

export const publicacionConComentarioValida = async (publicacion = '') => {
    const existe = await Comentario.findOne({ publicacion });
    if (!existe) {
        throw new Error(`No existen comentarios para la publicación con ID ${publicacion}.`);
    }
}
