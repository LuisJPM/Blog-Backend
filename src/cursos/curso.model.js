import { Schema, model } from "mongoose";

const CursoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "Name is required!"],
    maxLength: 300,
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
