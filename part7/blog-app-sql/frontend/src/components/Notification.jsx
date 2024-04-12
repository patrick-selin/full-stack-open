// import state to put the message inside the div
// useDispatch vai useSelector, createNotification

import { useSelector } from "react-redux";

const Notification = () => {

  const notification = useSelector(state => state.notification);

  if (notification === null) {
    return null;
  }

  // return <div className={message.type}>{notification}</div>; 
  return <div className={notification.type}>{notification.text}</div>;
};

export default Notification;
