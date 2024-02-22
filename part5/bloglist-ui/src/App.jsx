import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
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

      setUser(user);
      console.log(user);
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
