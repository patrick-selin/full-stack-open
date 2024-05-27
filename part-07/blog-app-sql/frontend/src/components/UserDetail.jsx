// UserDetail.jsx

import { useParams } from "react-router-dom";

const UserDetail = ({ user }) => {
  const { id } = useParams();

  if (!user) {
    return null;
  }

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
