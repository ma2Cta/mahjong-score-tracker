import React from "react";
import { Spinner } from "@nextui-org/react";

const LoadingSpinner: React.FC = () => {
  return (
    <div>
      <Spinner
        className="min-h-screen flex items-center justify-center"
        label="Loading..."
        color="primary"
      />
    </div>
  );
};

export default LoadingSpinner;
