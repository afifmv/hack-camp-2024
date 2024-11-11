// GlobalStateContext.tsx
import React, { createContext, useContext, useState } from "react";

// Define the context
interface GlobalStateContextProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(
  undefined
);

// Provider component
export const GlobalStateProvider: React.FC = ({ children }) => {
  const [score, setScore] = useState(0);

  return (
    <GlobalStateContext.Provider value={{ score, setScore }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the global state
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
