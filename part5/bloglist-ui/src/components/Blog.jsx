import { useState } from "react";

const Blog = ({ blog, updateBlogPostLikes, deleteBlogPost }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleLikeButton = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    updateBlogPostLikes(blog.id, blogToUpdate);
  };

  const handleDeletePost = () => {
    // TODO
  }

  return (
    <div className="blog">
      <div className="blog-title">
        <p>
          {blog.title} - {blog.author}
        </p>

        <button className="left-margin" onClick={toggleShowDetails}>
          {showDetails ? "hide" : "show"}
        </button>
      </div>

      {showDetails && (
        <div className="blog-modal">
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}
            <button onClick={handleLikeButton}>like</button>
          </div>
          <div>? {blog.user ? blog.user.name : <i>user unknow</i>}</div>
          <button onClick={handleDeletePost}>remove</button>
        </div>
      )}
    </div>
  );
};
export default Blog;
