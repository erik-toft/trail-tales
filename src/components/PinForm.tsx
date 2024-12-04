import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Pin } from "@/types/Pin.types";

type PinFormProps = {
  lat: number;
  lng: number;
  onSubmit: (data: Pin) => void;
  onClose: () => void;
};

const PinForm: React.FC<PinFormProps> = ({ lat, lng, onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pin>();

  const handleFormSubmit: SubmitHandler<Pin> = (data) => {
    onSubmit({
      ...data,
      lat,
      lng,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>

        <div>
          <label>Description:</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="error">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label>Latitude:</label>
          <input type="number" value={lat} disabled readOnly />
        </div>

        <div>
          <label>Longitude:</label>
          <input type="number" value={lng} disabled readOnly />
        </div>

        <button type="submit">Save Pin</button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
};

export default PinForm;
