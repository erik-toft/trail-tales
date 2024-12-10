import { pinCol } from "@/services/firebase"; // Din Firestore-samling
import { Pin } from "@/types/Pin.types"; // Importera Pin-typen
import useStreamCollection from "@/hooks/useStreamCollection";
import { where } from "firebase/firestore";

const useUserPins = (userId: string) => {
  const queryConstraints = [where("userId", "==", userId)];

  return useStreamCollection<Pin>(pinCol, ...queryConstraints); // Skicka Pin-typen här
};

export default useUserPins;
