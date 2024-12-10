import { pinCol } from "@/services/firebase";
import useStreamCollection from "@/hooks/useStreamCollection";

const usePins = () => {
  return useStreamCollection(pinCol);
};

export default usePins;
