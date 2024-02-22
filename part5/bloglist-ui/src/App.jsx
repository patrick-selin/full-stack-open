import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm"
//
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  //
  // hooks
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

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
      // blogService.setToken(user.token);
    }
  }, []);

  //
  // helper functions

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token)
      setUser(user);
      // console.log(user);
    } catch (exception) {
      // setErrorMessage("Wrong Credentials");
      console.log("not auth");
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
      
      setBlogs(blogs.concat(blog));
    } catch (exception) {
      // error message
      console.log("this is error messaae");
    }
  }

  return (
    <>
      <div>
        <h2>blogs</h2>

        {user ? (
          <>
            <p>{user.name} logged in</p>
            <button onClick={handleLogOut}>log out</button>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
            <BlogForm createBlogPost={createBlogPost}/>
            <br />
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
