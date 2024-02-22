import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
//
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  //
  // hooks
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [addBlogVisible, setAddBlogVisible] = useState(false);

  useEffect(() => {
    blogService.getAllBlogPosts().then((blogs) => {
      setBlogs(blogs);
      console.log(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    const notificationTimer = setTimeout(() => {
      setInfoMessage(null);
    }, 4000);
    return () => {
      clearTimeout(notificationTimer);
    };
  }, [infoMessage]);

  //
  // helper functions

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      // console.log(user);
    } catch (exception) {
      let errorMessage = "Login failed. Please try again.";
      if (
        exception.response &&
        exception.response.data &&
        exception.response.data.error
      ) {
        errorMessage = exception.response.data.error;
      }
      setInfoMessage({
        text: errorMessage,
        type: "error",
      });
    }
  };

  const handleLogOut = async () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
    console.log(user);
  };

  const createBlogPost = async ({ title, author, url }) => {
    try {
      const blog = await blogService.createNewBlogPost({
        title,
        author,
        url,
      });

      setBlogs([...blogs, blog]);
      setInfoMessage({
        text: `a new blog ${blog.title} by ${blog.author} added `,
        type: "success",
      });
      setAddBlogVisible(false);
    } catch (exception) {
      // error message
      console.log("this is error messaae");
    }
  };

  const hideWhenVisible = { display: addBlogVisible ? "none" : "" };
  const showWhenVisible = { display: addBlogVisible ? "" : "none" };

  return (
    <>
      <div>
        <h2>blogs</h2>
        <Notification message={infoMessage} />
        {user ? (
          <>
            <p>{user.name} logged in</p>
            <button className="gap" onClick={handleLogOut}>
              log out
            </button>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}

            {/* alas */}
            <div style={hideWhenVisible}>
              <button onClick={() => setAddBlogVisible(true)}>new note</button>
            </div>

            <div style={showWhenVisible}>
              <BlogForm createBlogPost={createBlogPost} />
              <button onClick={() => setAddBlogVisible(false)}>cancel</button>
            </div>
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
