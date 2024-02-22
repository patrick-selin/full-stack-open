const Blog = ({ blog }) => (
  // crete new blog post, needs props
  <div className="blog">
    {blog.title} {blog.author} {blog.url}
  </div>  
)

export default Blog