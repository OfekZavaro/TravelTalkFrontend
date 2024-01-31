import React from "react";
import Alert from "react-bootstrap/Alert";

interface CustomAlertProps {
  type: string;
  message: string;
  margin?: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ type, message, margin }) => {
  const alertStyle = {
    margin: margin || "0", // Use provided margin or default to 0 if not provided
  };

  return (
    <Alert
      variant={type === "danger" ? "danger" : "primary"}
      style={alertStyle}
    >
      {message}
    </Alert>
  );
};

export default CustomAlert;
