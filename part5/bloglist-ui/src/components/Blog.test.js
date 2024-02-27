import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    title: "Test title",
    author: "Test author",
    url: "https://www.hello.fi/",
    likes: 21,
    user: {
      username: "mrsuser88",
      name: "Hanna Smith",
    },
  };

  let component;

  beforeEach(() => {
    component = render(
      <Blog key={blog.id} blog={blog} />
    );
  });

  test("renders Blog component", () => {
    render(<Blog blog={blog} />);
  });

  test("renders Blog-component and shows title and tuhor, but not URL or likes", () => {
    expect(component.getByTestId("blog-component")).toBeInTheDocument();
    expect(component.container.querySelector(".blog-title")).toHaveTextContent(
      blog.title
    );
    expect(component.container.querySelector(".blog-title")).toHaveTextContent(
      blog.author
    );
    expect(component.queryByText(blog.url)).not.toBeInTheDocument();
    expect(component.queryByText(blog.likes)).not.toBeInTheDocument();
  });
});
