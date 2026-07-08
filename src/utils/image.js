import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile); // Make sure "image" matches your backend multer/upload field name!

  try {
    const response = await axiosInstance.post("/image-upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadImage;
