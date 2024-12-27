"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Image, Pin } from "@/types/Pin.types";
import useUploadPin from "@/hooks/useUploadPin";
import styles from "@/components/PinForm.module.css";
import UploadImage from "./UploadImage";
import useUploadImage from "@/hooks/useUploadImage";

type PinFormProps = {
  lat: number;
  lng: number;
  closeSidebar: () => void;
  pinFormOpen: boolean;
};

const PinForm: React.FC<PinFormProps> = ({
  lat,
  lng,
  closeSidebar,
  pinFormOpen,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pin>();
  const { uploadPin, isUploading, error } = useUploadPin();
  const [uploadedImages, setUploadedImages] = useState<Image[]>([]);
  const { removeStorageOnly } = useUploadImage();

  const handleImageUpload = (images: Image[]) => {
    setUploadedImages(images);
  };

  const handleFormSubmit: SubmitHandler<Pin> = async (data) => {
    try {
      await uploadPin({
        ...data,
        lat,
        lng,
        images: uploadedImages,
      });

      closeSidebar();
    } catch (err) {
      console.error("Failed to upload pin:", err);
    }
  };

  const handleCancel = async () => {
    try {
      uploadedImages.map((image) => {
        removeStorageOnly(image.id);
      });

      closeSidebar();
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  if (!pinFormOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={styles.modalContent}
      >
        <button className={styles.closeButton} onClick={() => closeSidebar()}>
          ✕
        </button>
        <span style={{ textAlign: "center", marginTop: "2rem" }}>Pin Form</span>
        <label className={styles.titleLabel}>Title</label>
        <input
          id="title"
          placeholder="title..."
          type="text"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p>{errors.title.message}</p>}
        <div className={styles.yearContainer}>
          <label className={styles.yearLabel}>Year</label>
          <input
            id="year"
            placeholder="year..."
            type="number"
            {...register("year")}
          />
        </div>
        {errors.title && <p>{errors.year?.message}</p>}

        <label className={styles.descriptionLabel}>Description</label>
        <textarea
          id="description"
          placeholder="description..."
          {...register("description")}
        />
        {errors.description && <p>{errors.description.message}</p>}

        <UploadImage onImageUpload={handleImageUpload} />

        <button type="submit" disabled={isUploading}>
          {isUploading ? "Saving..." : "Save Pin"}
        </button>
        <button
          style={{ marginBottom: "10rem" }}
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default PinForm;
