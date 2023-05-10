import mongoose from "mongoose";
const { Schema, model } = mongoose;

const JobSchema = new Schema({
  titulo: String,
  categoria: String,
  habilidades: String,
  precio: Number,
  tiempo: String,
  descripcion: String,
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
