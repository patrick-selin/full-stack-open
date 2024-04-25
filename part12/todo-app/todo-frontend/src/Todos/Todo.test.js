import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Todo from "./Todo";

test("renders todo text", () => {
  const todo = { text: "Test todo", done: false };
  const { getByText } = render(<Todo todo={todo} />);
  const todoText = screen.getByText(todo.text);
  expect(todoText).toBeInTheDocument();
});

test("calls deleteTodo function when delete button is clicked", () => {
  const todo = { text: "Test todo", done: false };
  const deleteTodo = jest.fn();
  const { getByText } = render(<Todo todo={todo} deleteTodo={deleteTodo} />);
  const deleteButton = screen.getByText("Delete");
  fireEvent.click(deleteButton);
  expect(deleteTodo).toHaveBeenCalledWith(todo);
});
