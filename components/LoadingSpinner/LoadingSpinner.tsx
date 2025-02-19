import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ClipLoader color="#3498db" size={50} />
      <div style={{ marginLeft: "16px", fontSize: "18px", fontWeight: "bold" }}>
        Loading users...
      </div>
    </div>
  );
};

export default LoadingSpinner;
