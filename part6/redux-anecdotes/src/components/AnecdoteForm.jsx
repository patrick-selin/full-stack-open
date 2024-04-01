// AnecdoteForm.jsx
import { useDispatch } from "react-redux";
import {
  notificationSet,
  notificationClear,
} from "../reducers/notificationReducer";
import { createAnecdote } from "../reducers/anecdoteReducer";

function AnecdoteForm() {
  const dispatch = useDispatch();

  const handleAddAnecdote = async (id) => {
    event.preventDefault();
    console.log("vote", id);

    const content = event.target.addNewAnecdote.value;
    event.target.addNewAnecdote.value = "";

    dispatch(createAnecdote(content));

    dispatch(notificationSet(`New Anecdote added: '${content}'`));

    setTimeout(() => {
      dispatch(notificationClear(""));
    }, 5000);
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
