// App.jsx
import { useEffect, useRef } from "react";
import Menu from "./components/Menu";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import UsersList from "./components/UsersList";
import UserDetail from "./components/UserDetail";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
//
import blogService from "./services/blogs";
import loginService from "./services/login";
//
import {
  useMatch,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { notificationSetter } from "./reducers/notificationReducer";
import {
  loginUser,
  logoutUser,
  initializeUserFromStorage,
} from "./reducers/signedUserReducer";
import {
  initializeBlogPosts,
  createBlogPost,
  deleteBlogPost,
  updateBlogPost,
} from "./reducers/blogPostsReducer";

import { initializeUsers, setUsers } from "./reducers/usersReducer";

const App = () => {
  const blogs = useSelector((state) => state.blogPosts);
  const signedUser = useSelector((state) => state.signedUser);
  const users = useSelector((state) => state.users);
  const addBlogFormRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeBlogPosts());
    dispatch(initializeUserFromStorage());
    dispatch(initializeUsers());
  }, [dispatch]);

  const handleLogin = async (username, password) => {
    try {
      const signedUser = await loginService.login({
        username,
        password,
      });

      blogService.setToken(signedUser.token);

      dispatch(loginUser(signedUser));
    } catch (exception) {
      let errorMessage = "Login failed. Please try again.";
      if (
        exception.response &&
        exception.response.data &&
        exception.response.data.error
      ) {
        errorMessage = exception.response.data.error;
      }

      dispatch(
        notificationSetter({
          text: errorMessage,
          timeOutLength: 5,
          type: "error",
        }),
      );
    }
  };

  const handleLogOut = async () => {
    dispatch(logoutUser());
  };

  const handleCreateBlogPost = async ({ title, author, url }) => {
    const year = new Date().getFullYear();

    const content = {
      title,
      author,
      url,
      year,
    };

    try {
      dispatch(createBlogPost(content));
      dispatch(
        notificationSetter({
          text: `a new blog ${content.title} by ${content.author} added`,
          timeOutLength: 5,
          type: "success",
        }),
      );

      addBlogFormRef.current.toggleVisibility();
    } catch (exception) {
      console.log("this is error messaage");
    }
  };

  const updateBlogPostLikes = async (postId, blogPostData) => {
    try {
      dispatch(updateBlogPost(postId, blogPostData));

      dispatch(
        notificationSetter({
          text: `you upvoted the post: ${blogPostData.title}`,
          timeOutLength: 3,
          type: "success",
        }),
      );
    } catch (exception) {
      "error" + exception.response.data.error;
    }
  };

  const handleDeleteBlogPost = async (postId) => {
    try {
      dispatch(deleteBlogPost(postId));

      dispatch(
        notificationSetter({
          text: "Blog post deleted.",
          timeOutLength: 5,
          type: "success",
        }),
      );
    } catch (exception) {
      "error" + exception.response.data.error;
    }
  };

  return (
    <>
      <div>
        <h2>blogs</h2>
        <Menu />
        <Notification />
        <Routes>
          <Route
            path="/"
            element={
              signedUser ? (
                <>
                  <p>{signedUser.name} logged in</p>
                  <button className="gap" onClick={handleLogOut}>
                    log out
                  </button>
                  {/* List of blogs */}
                  {blogs.map((blog) => (
                    <Blog
                      key={blog.id}
                      blog={blog}
                      updateBlogPostLikes={updateBlogPostLikes}
                      handleDeleteBlogPost={handleDeleteBlogPost}
                    />
                  ))}
                  {/* New blog form visibility */}
                  <Togglable buttonLabel="add new blog" ref={addBlogFormRef}>
                    <BlogForm handleCreateBlogPost={handleCreateBlogPost} />
                  </Togglable>
                </>
              ) : (
                <LoginForm handleLogin={handleLogin} />
              )
            }
          />
          <Route path="/users" element={<UsersList users={users} />} />
          <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
