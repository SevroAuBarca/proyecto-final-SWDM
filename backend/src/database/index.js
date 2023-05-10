import mongoose from "mongoose";
const connection = () => {
  mongoose.connect(
    "mongodb+srv://dylanbenz2000:frrKqJONugvJH9lz@empleos.m8micfl.mongodb.net/"
  );
  mongoose.connection.on("error", (err) => {
    console.log("Error de conexion!!: " + err);
  });
  mongoose.connection.on("open", () => {
    console.log("La conexión se ha establecido");
  });
};

export default connection;
