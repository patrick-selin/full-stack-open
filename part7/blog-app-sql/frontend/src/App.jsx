// App.jsx
import { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
//
import blogService from "./services/blogs";
import loginService from "./services/login";
//
import { useSelector, useDispatch } from "react-redux";
import { notificationSetter } from "./reducers/notificationReducer";
import {
  initializeBlogPosts,
  createBlogPost,
} from "./reducers/blogPostReducer";

const App = () => {
  //
  const blogs = useSelector((state) => state.blogPosts);
  //
  const [user, setUser] = useState(null);
  //
  const addBlogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogPosts());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
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
    setUser(null);
    localStorage.removeItem("loggedUser");
    console.log(user);
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
      const updatedBlog = await blogService.updateBlogPost(
        postId,
        blogPostData,
      );

      const newBlogs = blogs.map(
        (
          blog, // HERE
        ) => (blog.id === postId ? updatedBlog : blog),
      );
      // setBlogs(newBlogs); // HERE

      dispatch(
        notificationSetter({
          text: `you upvoted the post: ${blogPostData.title}`,
          timeOutLength: 3,
          type: "success",
        }),
      );
      setUser(user);
    } catch (exception) {
      "error" + exception.response.data.error;
    }
  };

  const deleteBlogPost = async (postId) => {
    try {
      const deleteBlogPost = await blogService.deleteBlogPost(postId);

      const updatedBlogs = blogs.filter((blog) => blog.id !== postId); // HERE
      // setBlogs(updatedBlogs);

      dispatch(
        notificationSetter({
          text: `Blog post deleted.`,
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
        <Notification />
        {user ? (
          <>
            <p>{user.name} logged in</p>
            <button className="gap" onClick={handleLogOut}>
              log out
            </button>

            {/* list of blogs */}
            {blogs // HERE // HERE
              // .sort((a, b) => a.likes - b.likes) // HERE
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateBlogPostLikes={updateBlogPostLikes}
                  deleteBlogPost={deleteBlogPost}
                />
              ))}

            {/* sort */}

            {/* new blog form visibility */}
            <Togglable buttonLabel="add new blog" ref={addBlogFormRef}>
              <BlogForm handleCreateBlogPost={handleCreateBlogPost} />
            </Togglable>
          </>
        ) : (
          <LoginForm handleLogin={handleLogin} />
        )}
        <br />
        <br />
      </div>
    </>
  );
};

export default App;
