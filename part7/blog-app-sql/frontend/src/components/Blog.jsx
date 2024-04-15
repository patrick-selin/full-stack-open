// Blog.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateBlogPost, deleteBlogPost } from "../reducers/blogPostsReducer";

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

    dispatch(updateBlogPost(blogData.id, updatedBlogData));
    setBlogData(updatedBlogData);
  };

  const handleDeletePost = () => {
    if (
      window.confirm(`Remove blog ${blogData.title} by ${blogData.author}?`)
    ) {
      dispatch(deleteBlogPost(blogData.id));
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
