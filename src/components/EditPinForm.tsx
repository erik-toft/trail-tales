"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Image, Pin } from "@/types/Pin.types";
import useUpdatePin from "@/hooks/useUpdatePin"; // Hook för att uppdatera pinen
import UploadImage from "./UploadImage"; // Komponent för att hantera uppladdning
import styles from "@/components/EditPinForm.module.css";
import useDeletePin from "@/hooks/useDeletePin";
import { FaArrowLeft } from "react-icons/fa";

type EditPinFormProps = {
  pin: Pin;
  setEdit: (value: boolean) => void;
  closeSidebar: () => void;
  setCurrentImages: React.Dispatch<React.SetStateAction<Image[]>>;
  setTitle: (value: string) => void;
  setYear: (value: number) => void;
};

const EditPinForm: React.FC<EditPinFormProps> = ({
  pin,
  setEdit,
  closeSidebar,
  setCurrentImages,
  setTitle,
  setYear,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pin>({
    defaultValues: pin,
  });

  const [currentImages] = useState<Image[]>(pin.images || []);
  const [newImages, setNewImages] = useState<Image[]>([]);
  const { updatePin, isUpdating, error: updateError } = useUpdatePin();
  const { deletePin } = useDeletePin();

  const handleImageUpload = (images: Image[]) => {
    setNewImages((prev) => [...prev, ...images]);
    setCurrentImages((prev) => [...prev, ...images]);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this pin?")) {
      deletePin(id);
      closeSidebar();
    }
  };

  const handleFormSubmit: SubmitHandler<Pin> = async (data) => {
    try {
      const updatedPin: Pin = {
        ...data,
        images: [...currentImages, ...newImages],
      };
      if (pin) {
        await updatePin(pin._id, updatedPin);
      }
      setTitle(data.title);
      if (data.year) setYear(data.year);

      setEdit(false);
    } catch (err) {
      console.error("Failed to update pin:", err);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        style={{ padding: "20px" }}
        className={styles.modalContent}
      >
        <button className={styles.closeButton} onClick={() => setEdit(false)}>
          <FaArrowLeft />
        </button>
        <span style={{ textAlign: "center", marginTop: "2rem" }}>
          Edit Pin Form
        </span>
        <label className={styles.titleLabel}>Title</label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p>{errors.title.message}</p>}
        <div className={styles.yearContainer}>
          <label className={styles.yearLabel}>Year</label>
          <input placeholder="1986..." type="number" {...register("year")} />
        </div>
        {errors.title && <p>{errors.year?.message}</p>}

        <label className={styles.positionLabel}>Pin Position</label>
        <div className={styles.positionContainer}>
          <label className={styles.latLabel}>Lat</label>
          <input type="number" step="any" {...register("lat")} />
          <label className={styles.lngLabel}>Lng</label>
          <input type="number" step="any" {...register("lng")} />
        </div>
        <label className={styles.descriptionLabel}>Description</label>
        <textarea
          {...register("description", {
            required: "Description is required",
          })}
        />
        {errors.description && <p>{errors.description.message}</p>}

        <UploadImage onImageUpload={handleImageUpload} />

        <button type="submit" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Save Changes"}
        </button>
        <button type="button" onClick={() => setEdit(false)}>
          Cancel
        </button>
        <button
          style={{ marginBottom: "10rem" }}
          type="button"
          onClick={() => handleDelete(pin._id)}
        >
          Delete Pin
        </button>
        {updateError && <p>{updateError}</p>}
      </form>
    </div>
  );
};

export default EditPinForm;
