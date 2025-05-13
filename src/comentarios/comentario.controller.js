import { response, request } from "express";
import Comentario from "./comentario.model.js";
import Publicacion from "../publicaciones/publicacion.model.js";

export const postComentario = async (req, res) => {
    try {
        const data = req.body;

        const publicacionEncontrada = await Publicacion.findOne({ title: data.publicacion });
        if (!publicacionEncontrada) {
            return res.status(400).json({
                success: false,
                message: 'Publicación no encontrada por título',
            });
        }

        data.publicacion = publicacionEncontrada._id;

        const comentario = new Comentario(data);
        await comentario.save();

        await comentario.populate({
            path: 'publicacion',
            select: 'title',
            populate: { path: 'course', select: 'name' }
        });

        res.status(200).json({
            success: true,
            message: '¡Comentario guardado exitosamente!',
            comentario
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al guardar el comentario',
            error: error.message
        });
    }
};

export const getComentarios = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { status: true };

        const [total, comentarios] = await Promise.all([
            Comentario.countDocuments(query),
            Comentario.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate({
                    path: 'publicacion',
                    select: 'title',
                    populate: { path: 'course', select: 'name' }
                })
        ]);

        res.status(200).json({
            success: true,
            message: 'Comentarios encontrados',
            total,
            comentarios
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener comentarios',
            error: error.message
        });
    }
};

export const getComentarioById = async (req, res) => {
    try {
        const { id } = req.params;

        const comentario = await Comentario.findById(id).populate({
            path: 'publicacion',
            select: 'title',
            populate: { path: 'course', select: 'name' }
        });

        if (!comentario) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Comentario encontrado',
            comentario
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener comentario',
            error: error.message
        });
    }
};

export const getComentarioByPublicacion = async (req, res) => {
    try {
        const { title } = req.params;

        const publicacion = await Publicacion.findOne({ title });

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });
        }

        const comentarios = await Comentario.find({ publicacion: publicacion._id, status: true })
            .populate({
                path: 'publicacion',
                select: 'title',
                populate: { path: 'course', select: 'name' }
            });

        res.status(200).json({
            success: true,
            message: 'Comentarios encontrados para la publicación',
            comentarios
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener comentarios para la publicación',
            error: error.message
        });
    }
};

export const putComentario = async (req, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const publicacionEncontrada = await Publicacion.findOne({ title: data.publicacion });

        if (!publicacionEncontrada) {
            return res.status(400).json({
                success: false,
                message: 'Publicación no encontrada por título',
            });
        }

        data.publicacion = publicacionEncontrada._id;

        const comentario = await Comentario.findByIdAndUpdate(id, data, { new: true }).populate({
            path: 'publicacion',
            select: 'title',
            populate: { path: 'course', select: 'name' }
        });

        res.status(200).json({
            success: true,
            message: 'Comentario actualizado',
            comentario
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar comentario',
            error: error.message
        });
    }
};

export const deleteComentario = async (req, res) => {
    try {
        const { id } = req.params;

        const comentario = await Comentario.findByIdAndUpdate(id, { status: false }, { new: true });

        res.status(200).json({
            success: true,
            message: 'Comentario desactivado',
            comentario
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al desactivar comentario',
            error: error.message
        });
    }
};
