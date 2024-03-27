import { useSelector, useDispatch } from "react-redux";
import { addVote, addAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  const handleAddAnecdote = (id) => {
    event.preventDefault();
    // console.log("vote", id);

    const content = event.target.addNewAnecdote.value;
    event.target.addNewAnecdote.value = "";

    dispatch(addAnecdote(content));
  };

  const handleVote = (id) => {
    // console.log("vote", id);

    dispatch(addVote(id));
  };

  const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input name="addNewAnecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
