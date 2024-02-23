import { useState } from "react";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="blog">
      <div className="blog-title">
        <p>{blog.title} - {blog.author}</p>

        <button className="left-margin" onClick={toggleShowDetails}>
          {showDetails ? "hide" : "show"}
        </button>
      </div>

      {showDetails && (
        <div className="blog-modal">
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}
            <button>like</button>
          </div>
          <div>? {blog.user ? blog.user.name : <i>user unknow</i>}</div>
        </div>
      )}
    </div>
  );
};
export default Blog;
