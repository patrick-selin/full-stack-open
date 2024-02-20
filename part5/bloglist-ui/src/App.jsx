import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";

const App = () => {
  // hooks
  //
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
    } catch (exception) {
      setErrorMessage("Wrong Credentials");
    }
  };

  return (
    <>
      <div>
        <h2>blogs</h2>
        <LoginForm handleLogin={handleLogin}/>
        {/* muista vaihtaa nakyma jos kirjautunut */}
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
