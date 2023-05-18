import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dbxkusypn",
  api_key: "467826675218695",
  api_secret: "wxpcHkkwekVYLf9tzCAtuhZxeTw",
});
const uploadImage = async (path) => {
  const { secure_url: url, public_id } = await cloudinary.uploader.upload(path);

  return { url, public_id };
};

const deleteImage = async (public_id) => {
  return await cloudinary.uploader.destroy(public_id);
};

export { uploadImage, deleteImage };
