import { Schema, model } from "mongoose";

const CursoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    maxLength: [300, "Máximo 300 caracteres"]
  },
  status: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
  versionKey: false
});

export default model('Curso', CursoSchema);