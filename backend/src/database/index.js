import mongoose from "mongoose";
const connection = () => {
  mongoose.connect(
    "mongodb+srv://daniel:12345@cluster0.m8ayag1.mongodb.net/jobs?retryWrites=true&w=majority"
  );
  mongoose.connection.on("error", (err) => {
    console.log("Error de conexion!!: " + err);
  });
  mongoose.connection.on("open", () => {
    console.log("Conexion establecida!!");
  });
};

export default connection;
