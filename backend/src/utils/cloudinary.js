const uploadImage = async (path) => {
  const { secure_url: url, public_id } = await cloudinary.v2.uploader.upload(
    path
  );

  return { url, public_id };
};

const deleteImage = async (public_id) => {
  return await cloudinary.v2.uploader.destroy(public_id);
};

export { uploadImage, deleteImage };
