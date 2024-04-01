// AnecdoteForm.jsx
import { useDispatch } from "react-redux";
import { appendAnecdote } from "../reducers/anecdoteReducer";
import {
  notificationSet,
  notificationClear,
} from "../reducers/notificationReducer";
import anecdoteService from '../services/anecdotes'

function AnecdoteForm() {
  const dispatch = useDispatch();

  const handleAddAnecdote = async (id) => {
    event.preventDefault();
    console.log("vote", id);

    const content = event.target.addNewAnecdote.value;
    event.target.addNewAnecdote.value = "";

    const newAnecdote = await anecdoteService.createNew(content) 

    dispatch(appendAnecdote(newAnecdote));

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
