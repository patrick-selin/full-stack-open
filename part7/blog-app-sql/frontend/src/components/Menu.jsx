// Menu.jsx

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/signedUserReducer";

const Menu = () => {
  const signedUser = useSelector((state) => state.signedUser);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logoutUser());
  };
  const padding = {
    paddingRight: 5,
    marginBottom: 15,
  };

  const nav = {
    marginBottom: "3rem",
  };

  return (
    <div style={nav}>
      <Link to="/" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      {signedUser ? (
        <>
          <p style={padding}>{signedUser.name} logged in</p>
          <button onClick={handleLogOut}>log out</button>
        </>
      ) : null}
    </div>
  );
};

export default Menu;
