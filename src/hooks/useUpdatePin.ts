import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "@/services/firebase"; // Din Firestore-instans
import { Pin } from "@/types/Pin.types";

const useUpdatePin = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePin = async (pinId: string, updatedData: Partial<Pin>) => {
    setIsUpdating(true);
    setError(null);

    try {
      // Referens till det specifika dokumentet
      const pinRef = doc(db, "pins", pinId);

      // Uppdatera dokumentet i Firestore
      await updateDoc(pinRef, updatedData);

      console.log("Pin updated successfully");
    } catch (err) {
      console.error("Error updating pin: ", err);
      setError("Failed to update pin. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updatePin, // Funktionen för att uppdatera en pin
    isUpdating, // Status för om en uppdatering pågår
    error, // Eventuella fel under uppdateringen
  };
};

export default useUpdatePin;
