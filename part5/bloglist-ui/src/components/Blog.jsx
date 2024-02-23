import { useState } from "react";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleClick = () => {
    console.log("object");
  };

  return (
    // {showModal &&
    <div className="blog">
      <div className="blog-title">
        <p>{blog.title}</p>

        <button className="left-margin" onClick={toggleShowDetails}>
          {showDetails ? "hide" : "show"}
        </button>
      </div>

      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>Likes: {blog.likes}
            <button>like</button>
          </div>
          <div>{blog.user.name}</div>
      
        </div>
      )}
    </div>
  );
};
export default Blog;

// {blog.author} {blog.url}
