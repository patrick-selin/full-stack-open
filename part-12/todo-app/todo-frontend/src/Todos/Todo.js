import React from "react";

const Todo = ({ todo, deleteTodo, completeTodo }) => {
  const onClickDelete = () => {
    deleteTodo(todo);
  };

  const onClickComplete = () => {
    completeTodo(todo);
  };

  return (
    <div>
      <span>{todo.text}</span>
      {todo.done ? (
        <span>
          This todo is done
          <button onClick={onClickDelete}>Delete</button>
        </span>
      ) : (
        <span>
          This todo is not done
          <button onClick={onClickDelete}>Delete</button>
          <button onClick={onClickComplete}>Set as done</button>
        </span>
      )}
    </div>
  );
};

export default Todo;
