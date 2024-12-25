"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import useUploadImage from "../hooks/useUploadImage";
import { Image } from "@/types/Pin.types";
import styles from "@/components/UploadImage.module.css";

const UploadImage = ({
  onImageUpload,
}: {
  onImageUpload: (images: Image[]) => void;
}) => {
  const { upload, removeStorageOnly, status } = useUploadImage();
  const [uploadedImages, setUploadedImages] = useState<Image[]>([]);
  const [showAllImages, setShowAllImages] = useState(false); // State for toggling image view

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) {
        console.log("Ingen bild valdes. Försök igen!");
        return;
      }

      const uploadPromises = acceptedFiles.map(async (file) => {
        try {
          const metadata = await upload(file);
          if (metadata) {
            return {
              name: metadata.name,
              id: metadata.id,
              size: metadata.size,
              url: metadata.url,
            };
          }
        } catch (err) {
          console.error("Error uploading image:", err);
          return undefined;
        }
      });

      try {
        const uploadedFilesMetadata = await Promise.all(uploadPromises);

        const successfulUploads = uploadedFilesMetadata.filter(
          (metadata) => metadata !== undefined
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

  const handleRemoveImage = async (imageId: string) => {
    try {
      await removeStorageOnly(imageId);

      const updatedImages = uploadedImages.filter(
        (image) => image.id !== imageId
      );

      setUploadedImages(updatedImages);
      onImageUpload(updatedImages);
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  const toggleImageView = () => {
    setShowAllImages(!showAllImages); // Toggle the state to show all images or just 3
  };

  return (
    <>
      <div className={styles.dropzone} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>{isDragActive ? "Drop image here!" : "Add images"}</p>
      </div>

      {status.progress !== 0 && (
        <div>
          <div
            style={{
              width: `${status.progress}%`,
              height: "10px",
              backgroundColor: "#4caf50",
            }}
          />
        </div>
      )}

      {status.error && <p style={{ color: "red" }}>😳 {status.error}</p>}

      <div className={styles.imageContainer}>
        {/* Only show first 3 images unless showAllImages is true */}
        {uploadedImages
          .slice(0, showAllImages ? uploadedImages.length : 3)
          .map((image) => (
            <ul key={image.id}>
              <li className={styles.imageList}>
                <div>
                  {image.name} ({Math.round(image.size / 1024)} KB)
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveImage(image.id)}
                >
                  X
                </button>
              </li>
            </ul>
          ))}
      </div>

      {uploadedImages.length > 3 && (
        <button
          type="button"
          className={styles.showAllButton}
          onClick={toggleImageView}
        >
          {showAllImages ? "Show less" : "Show all images"}
        </button>
      )}

      {status.isUploading && <p>Uploading...</p>}
    </>
  );
};

export default UploadImage;
