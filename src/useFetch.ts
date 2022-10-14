import { useEffect, useState } from "react";

export const useFetch = <T>(
  method: () => Promise<T>
): {
  isLoading: boolean;
  error: boolean;
  data: T | null;
} => {
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    method()
      .then(setData)
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [method]);

  const isLoading = data === null && !error;

  return {
    isLoading,
    data,
    error,
  };
};
