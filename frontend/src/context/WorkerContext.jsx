import { createContext, useState } from 'react';

export const WorkerDataContext = createContext();

const WorkerContext = ({ children }) => {
  const [worker, setWorker] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateWorker = (workerData) => {
    setWorker(workerData);
  };

  const value = {
    worker,
    setWorker,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateWorker,
  };

  return (
    <WorkerDataContext.Provider value={value}>
      {children}
    </WorkerDataContext.Provider>
  );
};

export default WorkerContext;
