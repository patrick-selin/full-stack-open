import { useState } from "react";
import { NotificationProps } from "../types";

const Notification = ({ message, onClose }: NotificationProps) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  return (
    <div style={{ display: visible ? "block" : "none" }}>
      <div>
        <p>{message}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Notification;
