// UserDetail.jsx

import { useEffect } from "react";
import { useParams } from "react-router-dom";

const UserDetail = ({ user }) => {
  const { id } = useParams();

  // Render user details
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;
