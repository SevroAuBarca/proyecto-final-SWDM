import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CompanySchema = new Schema({
  nombre_compañia: String,
  pais: String,
  seguidos: Number,
  seguidores: Number,
  informacion: String,
  imagen_perfil: { url: String, public_id: String },
  imagen_portada: { url: String, public_id: String },
  contratista: Boolean,
  contraseña: String,
  trabajos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
});

CompanySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

export default model("Companies", CompanySchema);
