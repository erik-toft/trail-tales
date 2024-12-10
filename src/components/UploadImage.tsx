import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import useUploadImage from "../hooks/useUploadImage";
import { v4 as uuidv4 } from "uuid";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/services/firebase";

const UploadImage = ({
  onImageUpload,
}: {
  onImageUpload: (images: { name: string; id: string; size: number }[]) => void;
}) => {
  const { upload, progress, isUploading, isSuccess, isError, error } =
    useUploadImage();
  const [uploadedImages, setUploadedImages] = useState<
    { name: string; id: string; size: number }[]
  >([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) {
        console.log("Ingen bild valdes. Försök igen!");
        return;
      }

      const newImagesMetadata = acceptedFiles.map((file) => {
        const uniqueId = uuidv4();
        return {
          name: file.name,
          id: uniqueId,
          size: file.size,
        };
      });

      const uploadPromises = acceptedFiles.map(async (file, index) => {
        try {
          await upload(file);
          return newImagesMetadata[index];
        } catch (err) {
          console.error("Error uploading image:", err);
          return null;
        }
      });

      try {
        const uploadedFilesMetadata = await Promise.all(uploadPromises);

        const successfulUploads = uploadedFilesMetadata.filter(
          (metadata) => metadata !== null
        );

        setUploadedImages((prevImages) => [
          ...prevImages,
          ...successfulUploads,
        ]);

        onImageUpload([...uploadedImages, ...successfulUploads]);
      } catch (err) {
        console.error("Error uploading images:", err);
      }
    },
    [upload, onImageUpload, uploadedImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
    onDrop,
  });

  const handleRemoveImage = async (imageId: string, imagePath: string) => {
    try {
      const imageRef = ref(storage, `images/${imagePath}`);
      await deleteObject(imageRef);

      const updatedImages = uploadedImages.filter(
        (image) => image.id !== imageId
      );

      setUploadedImages(updatedImages);
      onImageUpload(updatedImages);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>
          {isDragActive
            ? "Släpp bilden här!"
            : "Dra och släpp en bild här eller klicka för att välja"}
        </p>
      </div>

      {progress !== null && (
        <div>
          <div
            style={{
              width: `${progress}%`,
              height: "10px",
              backgroundColor: "#4caf50",
            }}
          />
        </div>
      )}

      {isError && <p style={{ color: "red" }}>😳 {error}</p>}

      {isSuccess &&
        uploadedImages.map((image) => (
          <ul key={image.id}>
            <li>
              {image.name} {Math.round(image.size / 1024)} KB
              <button
                style={{
                  display: "inline",
                  borderRadius: "5px",
                  marginLeft: "10px",
                  background: "red",
                }}
                onClick={() => handleRemoveImage(image.id, image.name)}
              >
                X
              </button>
            </li>
          </ul>
        ))}
      {isUploading && !isSuccess && !isError && <p>Laddar upp...</p>}
    </>
  );
};

export default UploadImage;
