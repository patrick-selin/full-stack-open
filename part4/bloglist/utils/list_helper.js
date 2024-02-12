const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const favorite = blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max;
  });

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  const blogCounts = {};

  blogs.forEach((blog) => {
    if (blogCounts.hasOwnProperty(blog.author)) {
      blogCounts[blog.author]++;
    } else {
      blogCounts[blog.author] = 1;
    }
  });

  let mostBlogsAuthor = "";
  let maxBlogs = 0;

  Object.keys(blogCounts).forEach(author => {
    console.log(`blogCount author : ${blogCounts[author]}`);
    if (blogCounts[author] > maxBlogs) {
      maxBlogs = blogCounts[author];
      mostBlogsAuthor = author;
      console.log(mostBlogsAuthor);
    }
  });

  return { author: mostBlogsAuthor, blogs: maxBlogs };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
