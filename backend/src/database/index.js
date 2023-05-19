import mongoose from "mongoose";
const connection = () => {
  //la conexion a la base de datos, determina si la conexion fue exitosa o no con el metodo on
  mongoose.connect(
    "mongodb+srv://dylanbenz2000:Ad0RyGjryixSDfsD@empleadosproject.2jnfwiq.mongodb.net/"
  );
  mongoose.connection.on("error", (err) => {
    console.log("Error de conexion!!: " + err);
  });
  mongoose.connection.on("open", () => {
    console.log("La conexión se ha establecido");
  });
};

export default connection;
