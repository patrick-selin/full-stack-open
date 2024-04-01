// AnecdoteForm.jsx
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

function AnecdoteForm() {
  const dispatch = useDispatch();

  const handleAddAnecdote = async (event) => {
    event.preventDefault();

    const content = event.target.addNewAnecdote.value;
    event.target.addNewAnecdote.value = "";

    dispatch(createAnecdote(content));
  };

  return (
    <div id="anecdote-form-component">
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
