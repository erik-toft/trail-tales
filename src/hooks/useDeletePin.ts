import { useState } from "react";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db, storage } from "@/services/firebase";
import useAuth from "@/hooks/useAuth";
import { ref, deleteObject } from "firebase/storage";
import { Image } from "@/types/Pin.types";

const useDeletePin = () => {
  const { currentUser } = useAuth();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const deletePin = async (pinId: string) => {
    if (!currentUser) {
      setError("You must be logged in to delete a pin.");
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);
      setIsSuccess(false);

      const pinRef = doc(db, "pins", pinId);
      const pinDoc = await getDoc(pinRef);

      if (!pinDoc.exists()) {
        throw new Error("Pin does not exist.");
      }

      const pinData = pinDoc.data();
      const images = pinData?.images || [];

      const imageDeletePromises = images.map((image: Image) => {
        const imageRef = ref(storage, image.url);
        return deleteObject(imageRef);
      });
      await Promise.all(imageDeletePromises);

      await deleteDoc(pinRef);

      console.log("Pin and associated images deleted successfully.");
      setIsSuccess(true);
    } catch (err) {
      console.error("Error deleting pin or images: ", err);
      setError("An error occurred while deleting the pin. Please try again.");
      setIsSuccess(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deletePin,
    isDeleting,
    error,
    isSuccess,
  };
};

export default useDeletePin;
