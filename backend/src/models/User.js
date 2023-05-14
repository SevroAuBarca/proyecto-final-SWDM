import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  nombre_completo: String,
  nombre_usuario: String,
  pais: String,
  seguidos: Number,
  seguidores: Number,
  informacion: String,
  trabajos_guardados: Number,
  imagen_perfil: { url: String, public_id: String },
  imagen_portada: { url: String, public_id: String },
  contratista: Boolean,
  contraseña: String,
});

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

export default model("User", UserSchema);
