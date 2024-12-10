import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebase";
import useAuth from "@/hooks/useAuth";
import { Pin } from "@/types/Pin.types";

const useUploadPin = () => {
  const { currentUser } = useAuth();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const uploadPin = async (pin: Pin) => {
    if (!currentUser) {
      setError("You must be logged in to upload a pin.");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      setIsSuccess(false);

      const pinRef = await addDoc(collection(db, "pins"), {
        ...pin,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
      });

      console.log("Pin saved with ID: ", pinRef.id);
      setIsSuccess(true);
    } catch (err) {
      console.error("Error saving pin: ", err);
      setError("An error occurred while saving your pin. Please try again.");
      setIsSuccess(false);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadPin,
    isUploading,
    error,
    isSuccess,
  };
};

export default useUploadPin;
