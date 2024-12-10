import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Pin } from "@/types/Pin.types";
import useUploadPin from "@/hooks/useUploadPin";
import styles from "@/components/PinForm.module.css";

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
  const [menuOpen] = useState(pinFormOpen);
  const handleFormSubmit: SubmitHandler<Pin> = async (data) => {
    try {
      await uploadPin({
        ...data,
        lat,
        lng,
      });
      closeSidebar();
    } catch (err) {
      console.error("Failed to upload pin:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      style={{ padding: "20px" }}
      className={`${styles.menu} ${menuOpen ? styles.open : ""}`}
    >
      <div>
        <label>Title:</label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <label>Description:</label>
        <textarea
          {...register("description", {
            required: "Description is required",
          })}
        />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <button type="submit" disabled={isUploading}>
        {isUploading ? "Saving..." : "Save Pin"}
      </button>
      <button type="button" onClick={closeSidebar}>
        Cancel
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default PinForm;
