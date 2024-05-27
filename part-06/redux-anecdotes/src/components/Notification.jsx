import { useSelector } from "react-redux";

const Notification = () => {
  // TODO
  const notification = useSelector(state => state.notification);

  const style = {
    marginTop: 10,
    marginBottom: 10,
    border: "solid",
    padding: 10,
    borderWidth: 2,
    backgroundColor: "lightblue",
  };
  return (
    <div style={style}>
      {notification}
    </div>
  );
};

export default Notification;
