import { useEffect, useState } from 'react';
import instance from '../utils/axios';

export const useApiData = <T>(path: string, defaultValue: any): T => {
  const [data, setData] = useState<T>(defaultValue);

  useEffect(() => {
    instance
      .get<T>(path)
      .catch((err) => err.response)
      .then((response) => {
        if (response.data.length) {
          setData(response.data);
        }
      });
  }, [path]);

  return data;
};

export default useApiData;
