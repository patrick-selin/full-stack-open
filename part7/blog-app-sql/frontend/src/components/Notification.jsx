// components/Notification.jsx

import { useSelector } from "react-redux";

const Notification = () => {

  const notification = useSelector(state => state.notification);
  console.log(`NOTIFICATION :: :: ${notification}`);

  if (!notification) {
    return null;
  }

  // return <div className={message.type}>{notification}</div>; 
  return <div>{notification}</div>;
};

export default Notification;
