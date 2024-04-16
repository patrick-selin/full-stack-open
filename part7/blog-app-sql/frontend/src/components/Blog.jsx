// Blog.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateBlogPost, deleteBlogPost } from "../reducers/blogPostsReducer";
import { notificationSetter } from "../reducers/notificationReducer";

const Blog = () => {
  const { id } = useParams();
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
      <h2>{blogData.title}</h2>
      <p>URL: {blogData.url}</p>
      <p>Likes: {blogData.likes}</p>
      <button onClick={handleLikeButton}>Like</button>
      <button onClick={handleDeletePost}>Remove</button>
      <div>
        <Link to="/">Back to Blogs</Link>
      </div>
    </div>
  );
};

export default Blog;
