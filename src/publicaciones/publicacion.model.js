import { Schema, model } from "mongoose";

const PublicacionSchema = Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    minLength: [1, 'El título debe tener al menos 1 carácter'],
    maxLength: [1000, 'El título no puede exceder los 1000 caracteres']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    minLength: [1, 'La descripción debe tener al menos 1 carácter'],
    maxLength: [1000, 'La descripción no puede exceder los 1000 caracteres']
  },
  curso: {
    type: [ { type: Schema.Types.ObjectId, ref: 'Curso' } ],
    required: true,
    validate: {
      validator: function (arr) {
        return Array.isArray(arr) && arr.length > 0;
      },
      message: 'Debe especificar al menos un curso'
    }
  },
  status: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
});

export default model('Publicacion', PublicacionSchema);