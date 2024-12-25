import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storage, db } from "@/services/firebase";
import { doc, deleteDoc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import useAuth from "@/hooks/useAuth";
import { Image } from "@/types/Pin.types";

const useUploadImage = () => {
  const [status, setStatus] = useState({
    isUploading: false,
    progress: 0,
    error: null,
  });
  const { currentUser } = useAuth();

  if (!currentUser) {
    throw new Error("Only authenticated users can upload images.");
  }

  const upload = async (image: File) => {
    setStatus({ isUploading: true, progress: 0, error: null });

    try {
      const uuid = uuidv4();
      const ext = image.name.split(".").pop();
      const storageFilename = `${image.name}_${uuid}.${ext}`;
      const storageRef = ref(storage, `images/${storageFilename}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setStatus((prevStatus) => ({
          ...prevStatus,
          progress: Math.round(progress),
        }));
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

      setStatus({ isUploading: false, progress: 0, error: null });

      return { id: uuid, name: image.name, size: image.size, url };
    } catch {
      console.error("Upload error:");
    }
  };

  const remove = async (imageId: string, pinId: string) => {
    try {
      const pinRef = doc(db, "pins", pinId);
      const imageRef = doc(db, "images", imageId);
      const docSnapshot = await getDoc(imageRef);
      const path = docSnapshot.data()?.path;

      if (path) {
        const storageRef = ref(storage, path);
        await deleteObject(storageRef);
        await deleteDoc(imageRef);
        const pinDocSnapshot = await getDoc(pinRef);
        const pinData = pinDocSnapshot.data();

        if (pinData && pinData.images) {
          const updatedImages = pinData.images.filter(
            (image: Image) => image.id !== imageId
          );
          await updateDoc(pinRef, {
            images: updatedImages,
          });
        }
      } else {
        console.error("Path not found for image:", imageId);
      }
    } catch (err) {
      console.error("Error removing image:", err);
    }
  };

  const removeStorageOnly = async (imageId: string) => {
    try {
      const imageRef = doc(db, "images", imageId);
      const docSnapshot = await getDoc(imageRef);
      const path = docSnapshot.data()?.path;

      if (path) {
        const storageRef = ref(storage, path);
        await deleteObject(storageRef);
        await deleteDoc(imageRef);
      } else {
        console.error("Path not found for image:", imageId);
      }
    } catch (err) {
      console.error("Error removing image:", err);
    }
  };

  return { upload, remove, removeStorageOnly, status };
};

export default useUploadImage;
