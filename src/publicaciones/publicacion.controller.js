import { response, request } from "express";
import Publicacion from "./publicacion.model.js";
import Course from "../cursos/curso.model.js";

export const postPublicacion = async (req, res) => {
    try {
        const data = req.body;
        const mapeo = await Course.find({ name: { $in: data.curso } });
        data.curso = mapeo.map(course => course._id);
        const publicacion = new Publicacion(data);
        await publicacion.save();
        await publicacion.populate('curso', 'name');

        res.status(200).json({
            success: true,
            message: '¡Publicación guardada exitosamente!',
            publicacion
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: '¡Error al guardar la publicación!',
            error: error.message
        });
    }
};

export const getPublicaciones = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { status: true };

        const [total, publicaciones] = await Promise.all([
            Publicacion.countDocuments(query),
            Publicacion.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('curso', 'name')
        ]);

        res.status(200).json({
            success: true,
            message: '¡Publicaciones encontradas!',
            total,
            publicaciones
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: '¡Error al obtener publicaciones!',
            error: error.message
        });
    }
};

export const getPublicacionById = async (req, res) => {
    try {
        const { id } = req.params;

        const publicacion = await Publicacion.findById(id).populate('curso', 'name');

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Publicación encontrada',
            publicacion
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la publicación',
            error: error.message
        });
    }
};

export const getPublicacionByTitulo = async (req, res) => {
    try {
        const { titulo } = req.params;

        const publicacion = await Publicacion.findOne({ titulo }).populate('curso', 'name');

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Publicación encontrada',
            publicacion
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar la publicación',
            error: error.message
        });
    }
};

export const putPublicacion = async (req, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const mapeo = await Course.find({ name: { $in: data.curso } });

        data.curso = mapeo.map(course => course._id);

        const publicacion = await Publicacion.findByIdAndUpdate(id, data, { new: true }).populate('curso', 'name');

        res.status(200).json({
            success: true,
            message: '¡Publicación actualizada!',
            publicacion
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: '¡Error al actualizar la publicación!',
            error: error.message
        });
    }
};

export const deletePublicacion = async (req, res) => {
    try {
        const { id } = req.params;

        const publicacion = await Publicacion.findByIdAndUpdate(id, { status: false }, { new: true });

        res.status(200).json({
            success: true,
            message: '¡Publicación desactivada!',
            publicacion
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: '¡Error al desactivar la publicación!',
            error: error.message
        });
    }
};
