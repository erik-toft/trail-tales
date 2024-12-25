"use client";
import {
  CollectionReference,
  onSnapshot,
  query,
  QueryConstraint,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const useStreamCollection = <T>(
  colRef: CollectionReference<T>,
  ...queryConstraints: QueryConstraint[]
) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const queryRef = query(colRef, ...queryConstraints);
    const unsubscribe = onSnapshot(
      queryRef,
      (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          _id: doc.id,
        }));

        setData(newData);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colRef]);

  return {
    data,
    loading,
    error,
  };
};

export default useStreamCollection;
