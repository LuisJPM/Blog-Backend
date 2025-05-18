import Publicacion from '../publicaciones/publicacion.model.js';
import Course from "../cursos/curso.model.js";
import Comentario from "../comentarios/comentario.model.js";

export const idPublicacionValida = async (id = '') => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error(`El ID proporcionado no es válido`);
    }
    
    const existe = await Publicacion.findOne({ _id: id, status: true });
    if (!existe) {
        throw new Error(`La publicación con ID ${id} no existe o está inactiva`);
    }
}

export const tituloPublicacionValido = async (titulo = '') => {
    if (titulo.trim().length === 0) {
        throw new Error('El título no puede estar vacío');
    }
    
    const existe = await Publicacion.findOne({ titulo, status: true });
    if (!existe) {
        throw new Error(`No existe publicación activa con el título "${titulo}"`);
    }
}

export const idCursoValido = async (id = '') => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error(`El ID del curso no es válido`);
    }
    
    const existe = await Course.findOne({ _id: id, status: true });
    if (!existe) {
        throw new Error(`El curso con ID ${id} no existe o está inactivo`);
    }
}

export const nombreCursoValido = async (name = '') => {
    if (name.trim().length === 0) {
        throw new Error('El nombre del curso no puede estar vacío');
    }
    
    const existe = await Course.findOne({ name, status: true });
    if (!existe) {
        throw new Error(`No existe curso activo con el nombre "${name}"`);
    }
}

export const idComentarioValido = async (id = '') => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error(`El ID del comentario no es válido`);
    }
    
    const existe = await Comentario.findOne({ _id: id, status: true });
    if (!existe) {
        throw new Error(`El comentario con ID ${id} no existe o está inactivo`);
    }
}

export const publicacionConComentarioValida = async (publicacionId = '') => {
    if (!publicacionId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error(`El ID de publicación no es válido`);
    }
    
    const existePublicacion = await Publicacion.findById(publicacionId);
    if (!existePublicacion) {
        throw new Error(`La publicación con ID ${publicacionId} no existe`);
    }
    
    const existeComentario = await Comentario.findOne({ 
        publicacion: publicacionId, 
        status: true 
    });
    
    if (!existeComentario) {
        throw new Error(`No existen comentarios activos para esta publicación`);
    }
}