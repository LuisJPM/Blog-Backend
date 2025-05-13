import { Schema, model } from "mongoose";

const PublicacionSchema = Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    minlength: 1,
    maxlength: 1000
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    minlength: 1,
    maxlength: 1000
  },
  curso:  [
    {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, "Course is required!"]
    }
  ],

  status: {
    type: Boolean,
    default: true
  }
  }, {
    timestamps: true,
    versionKey: false
  });

export default model('Publicacion', PublicacionSchema);
