import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

interface CloudinaryUploadResponse {
  secure_url: string;
  url: string;
  public_id: string;
}

const uploadToCloudinary = async (
  file: Blob | string,
  folder: string
): Promise<CloudinaryUploadResponse> => {
  if (typeof file === "string") {
    // URLまたはBase64文字列の場合
    return cloudinary.v2.uploader.upload(file, {
      folder,
    });
  } else {
    // Blobの場合
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadStream = (buffer: Buffer): Promise<CloudinaryUploadResponse> =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as CloudinaryUploadResponse);
            }
          }
        );
        stream.end(buffer);
      });

    return uploadStream(buffer);
  }
};

export default uploadToCloudinary;
