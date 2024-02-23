import { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
//
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";

const App = () => {
  //
  // hooks
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  //
  const addBlogFormRef = useRef();
  //
  
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const blogs = await blogService.getAllBlogPosts();
        setBlogs(blogs);
        console.log(blogs);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };
  
    fetchBlogPosts();
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
      
      // Check if the blog object returned by the backend includes user information
      if (blog.user) {
        
        setBlogs([...blogs, blog]);
        setInfoMessage({
          text: `a new blog ${blog.title} by ${blog.author} added `,
          type: "success",
        });
        addBlogFormRef.current.toggleVisibility();
      } else {
        // If user information is missing, fetch the updated blog post with user information
        const updatedBlog = await blogService.getBlogPostById(blog.id);
        setBlogs([...blogs, updatedBlog]);
        setInfoMessage({
          text: `a new blog ${updatedBlog.title} by ${updatedBlog.author} added `,
          type: "success",
        });
        addBlogFormRef.current.toggleVisibility();
      }
    } catch (exception) {
      // error message
      console.log("this is error messaae");
    }
  };

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

            {/* list of blogs */}
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}

            {/* new blog form visibility */}
            <Togglable buttonLabel="add new blog" ref={addBlogFormRef}>
              <BlogForm createBlogPost={createBlogPost} />
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
