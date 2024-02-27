import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Blog from "./Blog";

test("renders Blog component", () => {
  render(<Blog blog={{ title: "Test Title", author: "Test Author" }} />);
});


