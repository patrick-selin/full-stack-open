import { useEffect, useRef } from "react";
import Menu from "./components/Menu";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import UsersList from "./components/UsersList";
import UserDetail from "./components/UserDetail";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useMatch, Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { notificationSetter } from "./reducers/notificationReducer";
import {
  loginUser,
  initializeUserFromStorage,
} from "./reducers/signedUserReducer";
import {
  initializeBlogPosts,
  createBlogPost,
} from "./reducers/blogPostsReducer";
import { initializeUsers } from "./reducers/usersReducer";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const App = () => {
  const blogs = useSelector((state) => state.blogPosts);
  const signedUser = useSelector((state) => state.signedUser);
  const users = useSelector((state) => state.users);
  const addBlogFormRef = useRef();
  const dispatch = useDispatch();
  const matchUser = useMatch("/users/:id");
  const user = matchUser
    ? users.find((user) => user.id === Number(matchUser.params.id))
    : null;

  useEffect(() => {
    const userFromStorage = dispatch(initializeUserFromStorage());
    if (userFromStorage) {
      blogService.setToken(userFromStorage.token);
    }
    dispatch(initializeBlogPosts());
    dispatch(initializeUsers());
  }, [dispatch]);

  const handleLogin = async (username, password) => {
    try {
      const signedUser = await loginService.login({ username, password });
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
        })
      );
    }
  };

  const handleCreateBlogPost = async ({ title, author, url }) => {
    const year = new Date().getFullYear();
    const content = { title, author, url, year };
    try {
      dispatch(createBlogPost(content));
      dispatch(
        notificationSetter({
          text: `a new blog ${content.title} by ${content.author} added`,
          timeOutLength: 5,
          type: "success",
        })
      );
      addBlogFormRef.current.toggleVisibility();
    } catch (exception) {
      console.log("this is error messaage");
    }
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom>
            Blogs
          </Typography>
          <Menu />
          <Notification />
          <Routes>
            <Route
              path="/"
              element={
                signedUser ? (
                  <>
                    {blogs.map((blog) => (
                      <Paper key={blog.id} elevation={3} style={{ padding: 20, marginBottom: 10 }}>
                        <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none' }}>
                          <Typography variant="h4" component="h3" gutterBottom>
                            {blog.title}
                          </Typography>
                        </Link>
                      </Paper>
                    ))}
                    <Togglable buttonLabel="Add New Blog" ref={addBlogFormRef}>
                      <BlogForm handleCreateBlogPost={handleCreateBlogPost} />
                    </Togglable>
                  </>
                ) : (
                  <LoginForm handleLogin={handleLogin} />
                )
              }
            />
            <Route path="/users" element={<UsersList users={users} />} />
            <Route path="/users/:id" element={<UserDetail user={user} />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
