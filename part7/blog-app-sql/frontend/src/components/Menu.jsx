// Menu.jsx

import { Link } from "react-router-dom";

const Menu = () => {
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
      {/* user log in / singed user */}
    </div>
  );
};

export default Menu;