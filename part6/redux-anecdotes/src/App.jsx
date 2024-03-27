import { useSelector, useDispatch } from "react-redux";
import { addVote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleAddNew = (id) => {
    event.preventDefault();
    console.log("vote", id);

    const content = event.target.addNew.value;
    event.target.addNew.value = "";

    // store.dispatch({
    //   type: "NEW_NOTE",
    //   payload: {
    //     content,
    //   },
    // });
  };

  const handleVote = (id) => {
    console.log("vote", id);

    dispatch(addVote(id))
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleAddNew}>
        <div>
          <input name="addNew" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
