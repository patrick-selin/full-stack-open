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

  //
  // helper functions

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      console.log(user);
    } catch (exception) {
      // setErrorMessage("Wrong Credentials");
      console.log("not auth");
    }
  };

  const handleLogOut = async () => {
    setUser(null)
    console.log(user);
  }

  return (
    <>
      <div>
        <h2>blogs</h2>

        {user ? (
          <>
            <p>{user.name} logged in</p>
            <button onClick={handleLogOut}>log out</button>
          </>
        ) : (
          <LoginForm handleLogin={handleLogin} />
        )}
        <br />
        <br />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default App;
