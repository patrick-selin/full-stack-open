import { useState } from "react";

const BlogForm = () => {
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
  };

  const handleChange = (event) => {
    const { title, author, url } = event.target;
    setFormData({
      ...formData,
      [title]: value,
      [author]: value,
      [url]: value,
    });
  };

  // return
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="name"
            value={formData.title}
            onChange={handleChange}
          />
        </label>

        <label>
          Title:
          <input
            type="text"
            name="name"
            value={formData.author}
            onChange={handleChange}
          />
        </label>

        <label>
          Title:
          <input
            type="text"
            name="name"
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
