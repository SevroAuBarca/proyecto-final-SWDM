import multer from "multer";
import cloudinary from "cloudinary";

const upload = multer({ dest: "upload/" });
const cloudinaryService = cloudinary.config({
  cloud_name: "dbxkusypn",
  api_key: "467826675218695",
  api_secret: "wxpcHkkwekVYLf9tzCAtuhZxeTw",
});

export { upload, cloudinaryService };
