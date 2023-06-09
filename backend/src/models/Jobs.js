import mongoose from "mongoose";
const { Schema, model } = mongoose;

const JobSchema = new Schema({
  titulo: String,
  categoria: String,
  habilidades: String,
  salario: Number,
  tiempo: String,
  descripcion: String,
  //esta es una referencia a otro modelo, donde podremos obtener sus datos en este esquema guardando su id en el array
  compania: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Companies",
    },
  ],
});

JobSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

export default model("Job", JobSchema);
