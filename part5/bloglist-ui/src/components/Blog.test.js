import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  // start session ??
  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog key={blog.id} blog={blog} updateLikes={mockHandler} />
    );

    const user = userEvent.setup();
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

  test("checks that the blog's URL and likes are shown when the button has been clicked", () => {
    const button = component.getByText("show");
    fireEvent.click(button);

    expect(component.getByText(blog.url)).toBeInTheDocument();
    expect(component.getByText(`Likes: ${blog.likes}`)).toBeInTheDocument();
  });
});
