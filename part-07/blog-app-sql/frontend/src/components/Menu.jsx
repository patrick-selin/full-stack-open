// Menu.jsx

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/signedUserReducer";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
    <div style={{ marginBottom: "1rem" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>
        <Typography variant="button" color="primary">
          blogs
        </Typography>
      </Link>
      <Link to="/users" style={{ marginRight: "1rem" }}>
        <Typography variant="button" color="primary">
          users
        </Typography>
      </Link>
      {signedUser ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="button"
            color="primary"
            style={{ marginRight: "1rem" }}
          >
            {signedUser.name} logged in
          </Typography>
          <Button variant="contained" color="error" onClick={handleLogOut}>
            Log out
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Menu;
