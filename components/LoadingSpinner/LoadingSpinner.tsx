import React from "react";
import { ClipLoader } from "react-spinners";

interface LoadingSpinnerProps {
  message: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ClipLoader color="#3498db" size={50} />
      <div style={{ marginLeft: "16px", fontSize: "18px", fontWeight: "bold" }}>
        {message}
      </div>
    </div>
  );
};

export default LoadingSpinner;
