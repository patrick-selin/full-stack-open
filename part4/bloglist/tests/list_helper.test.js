const listHelper = require("../utils/list_helper");

const blogs = [
  {
    title: "Blog 1",
    author: "Author 1",
    url: "http://example.com/blog1",
    likes: 10,
  },
  {
    title: "Blog 2",
    author: "Author 2",
    url: "http://example.com/blog2",
    likes: 20,
  },
  {
    title: "Blog 3",
    author: "Author 3",
    url: "http://example.com/blog3",
    likes: 35,
  },
];

describe("blog posts total likes", () => {
  test("dummy returns one if given an array of anything", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });

  test("totalLikes returns total sum of likes when giben list of blog post in array", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(65);
  });
});
