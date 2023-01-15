import { useState } from 'react';

export const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loadsFor = (miliseconds) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, miliseconds);
  };

  const loadsForRandom = () => {
    setIsLoading(true);
    const random = Math.floor(Math.random() * (20000 - 5000 + 1) + 5000);
    setTimeout(() => {
      setIsLoading(false);
    }, random);
  };

  return {
    isLoading,
    loadsFor,
    loadsForRandom
  };
};
