// UserDetail.jsx

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../reducers/usersReducer";

const UserDetail = () => {
  const { id } = useParams();
  const userId = parseInt(id); // Convert id to integer if needed
  const user = useSelector((state) =>
    state.users.find((user) => user.id === userId),
  );
  const dispatch = useDispatch();

  console.log(`user-COMPONENT ::`, user);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  if (!user) {
    // Handle loading state
    return <div>Loading...</div>;
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