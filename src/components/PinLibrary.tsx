import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Image, Pin } from "@/types/Pin.types";
import styles from "./PinLibrary.module.css";
import Slideshow from "./Slideshow";
import EditPinForm from "./EditPinForm";
import useUploadImage from "@/hooks/useUploadImage";
import { FaTrashAlt } from "react-icons/fa";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

interface PinLibraryProps {
  pin: Pin;
  closeSidebar: () => void;
}

const PinLibrary: React.FC<PinLibraryProps> = ({ pin, closeSidebar }) => {
  const [isSwiperOpen, setIsSwiperOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [edit, setEdit] = useState(false);
  const { remove: deleteImage } = useUploadImage();
  const [currentImages, setCurrentImages] = useState<Image[]>(pin.images || []);
  const [year, setYear] = useState(pin.year);
  const [title, setTitle] = useState(pin.title);

  const openSwiper = (index: number) => {
    setInitialSlide(index);
    setIsSwiperOpen(true);
  };

  const closeSwiper = () => {
    setIsSwiperOpen(false);
  };

  const handleRemoveImage = async (imageId: string) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!userConfirmed) return;

    try {
      await deleteImage(imageId, pin._id);
      setCurrentImages((prev) => prev.filter((image) => image.id !== imageId));
    } catch (err) {
      console.error("Error removing image:", err);
    }
  };

  const handleCommentChange = (index: number, newComment: string) => {
    const updatedImages = [...currentImages];
    updatedImages[index].comment = newComment;
    setCurrentImages(updatedImages);

    const pinRef = doc(db, "pins", pin._id);
    updateDoc(pinRef, { images: updatedImages }).catch((err) =>
      console.error("Error updating comment:", err)
    );
  };

  return (
    <div>
      {!isSwiperOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            {!edit && (
              <>
                <span style={{ textAlign: "start" }}>
                  {title} {year}
                </span>
                <button
                  className={styles.closeButton}
                  onClick={() => closeSidebar()}
                >
                  x
                </button>
                <div className={styles.buttonContainer}>
                  <Slideshow
                    title={title}
                    year={year}
                    currentImages={currentImages}
                  />
                  <button
                    className={styles.editButton}
                    onClick={() => setEdit(true)}
                  >
                    Edit Pin
                  </button>
                </div>
                {currentImages && currentImages.length > 0 ? (
                  currentImages.map((image: Image, index: number) => (
                    <div key={image.id} className={styles.contentContainer}>
                      <img
                        src={image.url}
                        alt={image.name}
                        className={styles.image}
                        onClick={() => openSwiper(index)}
                      />
                      <textarea
                        value={image.comment || ""}
                        onChange={(e) =>
                          handleCommentChange(index, e.target.value)
                        }
                        className={styles.commentInput}
                        placeholder="Add a comment..."
                      />
                      <button
                        className={styles.deleteButton}
                        type="button"
                        onClick={() => handleRemoveImage(image.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No images available.</p>
                )}
              </>
            )}
            {edit && (
              <EditPinForm
                setCurrentImages={setCurrentImages}
                setEdit={setEdit}
                closeSidebar={closeSidebar}
                setYear={setYear}
                setTitle={setTitle}
                pin={pin}
              />
            )}
          </div>
        </div>
      )}

      {isSwiperOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeSwiper}>
              ✕
            </button>
            <Swiper
              navigation
              modules={[Navigation]}
              initialSlide={initialSlide}
              className={styles.swiper}
            >
              {currentImages.map((image: Image) => (
                <SwiperSlide key={image.url}>
                  <img
                    src={image.url}
                    alt={image.name}
                    className={styles.swiperImage}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default PinLibrary;
