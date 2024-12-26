"use client";

import { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { Image } from "@/types/Pin.types"; // Importera Image-typen

const useAssociatedImages = (pinId: string | null) => {
  const [associatedImages, setAssociatedImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (!pinId) return;

      setLoading(true);
      setError(null);

      try {
        const pinRef = doc(db, "pins", pinId);
        const pinSnapshot = await getDoc(pinRef);
        const pinData = pinSnapshot.data();

        if (pinData && pinData.images && Array.isArray(pinData.images)) {
          const imageIds = pinData.images.map(
            (image: { id: string }) => image.id
          );

          const imagesQuery = query(
            collection(db, "images"),
            where("id", "in", imageIds)
          );

          const querySnapshot = await getDocs(imagesQuery);

          const imagesList: Image[] = querySnapshot.docs.map((doc) => {
            return doc.data() as Image;
          });

          setAssociatedImages(imagesList);
        } else {
          setAssociatedImages([]);
        }
      } catch (err) {
        setError("Failed to fetch images");
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [pinId]);

  return { associatedImages, loading, error };
};

export default useAssociatedImages;
