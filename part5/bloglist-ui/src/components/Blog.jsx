const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author} {blog.likes} - - - user is {blog.user.name}
  </div>  
)

export default Blog