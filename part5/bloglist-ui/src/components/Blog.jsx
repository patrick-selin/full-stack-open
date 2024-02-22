const Blog = ({ blog }) => (
  // crete new blog post, needs props
  <div>
    {blog.title} {blog.author} {blog.likes} - - - user is {blog.user.name}
  </div>  
)

export default Blog