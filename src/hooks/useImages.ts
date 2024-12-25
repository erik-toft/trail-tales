"use client";

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { Image } from "@/types/Pin.types";
import { Pin } from "@/types/Pin.types";

const useImages = (pinId: string | null) => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (!pinId) return;

      setLoading(true);
      setError(null);

      try {
        const pinRef = doc(db, "pins", pinId);
        const pinSnapshot = await getDoc(pinRef);

        if (pinSnapshot.exists()) {
          const pinData = pinSnapshot.data() as Pin;
          const imagesData = pinData.images || [];
          setImages(imagesData);
          console.log(imagesData);
        } else {
          setImages([]);
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

  return { images, loading, error };
};

export default useImages;
