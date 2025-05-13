import { Schema, model } from "mongoose";

const ComentarioSchema = Schema({
  nombreAutor: {
    type: String,
        required: [true, "Ponga el nombre del autor"],
        maxLength: [50, "solo se pueden poner un maximo de 50 caracteres"]
  },
  contenido: {
    type: String,
        required: [true, "El comentario necesita contenido"],
        maxLength: [3000, "solo se pueden poner un maximo de 300 caracteres"]
  },
  publicacion: {
    type: Schema.Types.ObjectId,
    ref: 'Publicacion',
    required: [true, 'La publicación es obligatoria']
  },
  status: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
});

export default model('Comentario', ComentarioSchema);
