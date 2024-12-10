import { CollectionReference, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const useStreamCollection = <T>(colRef: CollectionReference<T>) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const queryRef = query(colRef);

    const unsubscribe = onSnapshot(
      queryRef,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          _id: doc.id,
        }));

        setData(data);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [colRef]);

  return {
    data,
    loading,
    error,
  };
};

export default useStreamCollection;
