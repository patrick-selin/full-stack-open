import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const BlogForm = ({ handleCreateBlogPost }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitPost = (event) => {
    event.preventDefault();
    handleCreateBlogPost(formData);
    setFormData({ title: "", author: "", url: "" });
  };

  return (
    <Box>
      <Typography variant="h2">Create New Blog</Typography>
      <form onSubmit={handleSubmitPost}>
        <TextField
          label="Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Author"
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="URL"
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <Button variant="contained" type="submit">Create</Button>
      </form>
    </Box>
  );
};

BlogForm.propTypes = {
  handleCreateBlogPost: PropTypes.func.isRequired,
};

export default BlogForm;