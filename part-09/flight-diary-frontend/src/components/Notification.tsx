import { useState } from "react";
import { NotificationProps } from "../types";

const Notification = ({ message, onClose }: NotificationProps) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  return (
    <div
      style={{ display: visible ? "inline-block" : "none", border: "2px solid red", padding: "10px" }}
    >
      <div>
        <p style={{ color: "red", fontWeight: "600" }}>{message}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Notification;
