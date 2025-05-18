import { response, request } from "express";
import Curso from "./curso.model.js";

export const postCurso = async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'El nombre del curso es obligatorio'
            });
        }

        const curso = new Curso({ nombre });
        await curso.save();

        res.status(200).json({
            success: true,
            message: '¡Curso guardado exitosamente!',
            curso
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '¡Error al guardar el curso!',
            error: error.message
        });
    }
};

export const getCursos = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { status: true };

        const [total, cursos] = await Promise.all([
            Curso.countDocuments(query),
            Curso.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            success: true,
            total,
            cursos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '¡Error al obtener los cursos!',
            error: error.message
        });
    }
};

export const getCursoById = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await Curso.findById(id);

        if (!curso) {
            return res.status(404).json({
                success: false,
                message: '¡Curso no encontrado!'
            });
        }

        res.status(200).json({
            success: true,
            curso
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '¡Error al obtener el curso!',
            error: error.message
        });
    }
};

export const getCursoByNombre = async (req, res) => {
    try {
        const { name } = req.params;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'El nombre es requerido'
            });
        }

        const curso = await Curso.findOne({ nombre: name });

        if (!curso) {
            return res.status(404).json({
                success: false,
                message: '¡Curso no encontrado!'
            });
        }

        res.status(200).json({
            success: true,
            curso
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '¡Error al obtener el curso!',
            error: error.message
        });
    }
};

export const putCurso = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'El nombre es obligatorio'
            });
        }

        const curso = await Curso.findByIdAndUpdate(id, { nombre }, { new: true });

        res.status(200).json({
            success: true,
            message: '¡Curso actualizado!',
            curso
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '¡Error al actualizar el curso!',
            error: error.message
        });
    }
};

export const deleteCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await Curso.findByIdAndUpdate(id, { status: false }, { new: true });

        res.status(200).json({
            success: true,
            message: '¡Curso desactivado!',
            curso
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '¡Error al desactivar el curso!',
            error: error.message
        });
    }
};