import { useState } from "react";

const BlogForm = ({ createBlogPost }) => {
  // hooks
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: "",
  });

  // helper functions
  const handleSubmit = () => {
    event.preventDefault();
    console.log("submitted");
    console.log(formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitPost = (event) => {
    event.preventDefault();
    createBlogPost(formData);
    setFormData({ title: "", author: "", url: "" });
  };

  // return
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmitPost}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>

        <label>
          Title:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </label>

        <label>
          Title:
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
          />
        </label>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
