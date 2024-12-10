import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storage, db } from "@/services/firebase"; // Här importeras både storage och db
import { doc, setDoc } from "firebase/firestore"; // Firestore funktioner
import useAuth from "@/hooks/useAuth";

const useUploadImage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number | null>(null);

  const { currentUser } = useAuth();

  if (!currentUser) {
    throw new Error("Only authenticated users can upload images.");
  }

  const upload = async (image: File) => {
    setError(null);
    setIsError(null);
    setIsSuccess(null);
    setIsUploading(true);
    setProgress(null);

    try {
      const uuid = uuidv4();
      const ext = image.name.split(".").pop();
      const storageFilename = `${image.name}_${uuid}.${ext}`;
      const storageRef = ref(storage, `images/${storageFilename}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on("state_changed", (snapshot) => {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(percentage));
      });

      await uploadTask;

      const url = await getDownloadURL(storageRef);

      const imageDocRef = doc(db, "images", uuid);
      await setDoc(imageDocRef, {
        path: storageRef.fullPath,
        name: image.name,
        size: image.size,
        type: image.type,
        uid: currentUser.uid,
        url,
      });

      setIsError(false);
      setIsSuccess(true);
      setProgress(null);

      console.log(
        "Image metadata saved in Firestore with ID: ",
        imageDocRef.id
      );
    } catch (err) {
      console.error("Error during image upload: ", err);
      setIsError(true);
      setIsSuccess(false);
      setError(
        err instanceof Error ? err.message : "An error occurred during upload."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return {
    error,
    isError,
    isSuccess,
    isUploading,
    progress,
    upload,
  };
};

export default useUploadImage;
