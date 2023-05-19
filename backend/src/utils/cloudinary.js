import cloudinary from "cloudinary";
//este archivo es la configuacion del cloudinary, cloudinary sirve para poder subir imagenes o videos y hostearlos en una nube
cloudinary.config({
  cloud_name: "dbxkusypn",
  api_key: "467826675218695",
  api_secret: "wxpcHkkwekVYLf9tzCAtuhZxeTw",
});

//con estos metodos podras subir imagenes a la nube, te regresaran un objeto con la url de la imagen y un id de la misma
const uploadImage = async (path) => {
  const { secure_url: url, public_id } = await cloudinary.uploader.upload(path);

  return { url, public_id };
};

//con este metodo podras eliminar la imagen de la nube utilizando el id que te dan al crearlo
const deleteImage = async (public_id) => {
  return await cloudinary.uploader.destroy(public_id);
};

export { uploadImage, deleteImage };
