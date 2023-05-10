import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CompanySchema = new Schema({
  nombre_compañia: String,
  pais: String,
  seguidores: Number,
  informacion: String,
  trabajos_guardados: Number,
  imagen_perfil: String,
  imagen_portada: String,
  contratista: Boolean,
  contraseña: String,
  trabajos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
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
