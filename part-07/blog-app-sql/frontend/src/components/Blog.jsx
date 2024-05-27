// Blog.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateBlogPost, deleteBlogPost } from "../reducers/blogPostsReducer";
import { notificationSetter } from "../reducers/notificationReducer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Blog = () => {
  const { id } = useParams();
  let navigateTo = useNavigate();
  const dispatch = useDispatch();
  const blog = useSelector((state) =>
    state.blogPosts.find((blog) => blog.id === Number(id)),
  );
  const [blogData, setBlogData] = useState(blog);

  useEffect(() => {
    setBlogData(blog);
  }, [blog]);

  const handleLikeButton = () => {
    const updatedBlogData = {
      ...blogData,
      likes: blogData.likes + 1,
    };
    try {
      dispatch(updateBlogPost(blogData.id, updatedBlogData));
      setBlogData(updatedBlogData);

      dispatch(
        notificationSetter({
          text: `you upvoted the post: ${blogData.title}`,
          timeOutLength: 3,
          type: "success",
        }),
      );
    } catch (exception) {
      "error" + exception.response.data.error;
    }
  };

  const handleDeletePost = () => {
    if (
      window.confirm(`Remove blog ${blogData.title} by ${blogData.author}?`)
    ) {
      try {
        dispatch(deleteBlogPost(blogData.id));
        dispatch(
          notificationSetter({
            text: "Blog post deleted.",
            timeOutLength: 5,
            type: "success",
          }),
        );
        //
        navigateTo("/");
      } catch (exception) {
        "error" + exception.response.data.error;
      }
    }
  };

  if (!blogData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography variant="h2">{blogData.title}</Typography>
      <Typography variant="body1">URL: {blogData.url}</Typography>
      <Typography variant="body1">Likes: {blogData.likes}</Typography>
      <Button variant="contained" color="primary" onClick={handleLikeButton}>Like</Button>
      <Button variant="contained" color="error" onClick={handleDeletePost}>Remove</Button>
      <div>
        <Link to="/">
          <Typography variant="body1">Back to Blogs</Typography>
        </Link>
      </div>
    </div>
  );
};

export default Blog;
