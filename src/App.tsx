import React from "react";
import { useAuthInit } from "./hooks/useAuthInit";

export const App: React.FC = () => {
  useAuthInit();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1>Project Management App</h1>
    </div>
  );
};

export default App;
