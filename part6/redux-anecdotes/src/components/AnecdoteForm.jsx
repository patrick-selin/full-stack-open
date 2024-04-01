// AnecdoteForm.jsx
import { useDispatch } from "react-redux";
import { appendAnecdote } from "../reducers/anecdoteReducer";
import {
  notificationSet,
  notificationClear,
} from "../reducers/notificationReducer";

function AnecdoteForm() {
  const dispatch = useDispatch();

  const handleAddAnecdote = (id) => {
    event.preventDefault();
    console.log("vote", id);

    const content = event.target.addNewAnecdote.value;
    event.target.addNewAnecdote.value = "";

    dispatch(appendAnecdote(content));
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
