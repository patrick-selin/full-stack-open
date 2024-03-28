// AnecdoteForm.jsx

import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

function AnecdoteForm() {
  const dispatch = useDispatch();

  const handleAddAnecdote = (id) => {
    event.preventDefault();
    console.log("vote", id);

    const content = event.target.addNewAnecdote.value;
    event.target.addNewAnecdote.value = "";

    dispatch(addAnecdote(content));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input name="addNewAnecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
