// AnecdoteList.jsx
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    if (state.filter === "ALL") {
      return state.anecdotes;
    }
    return state.anecdotes.filter((anecdoteItem) => {
      return anecdoteItem.content.toLowerCase().includes(state.filter.toLowerCase());
    });
  });

  const handleVote = (id) => {
    // console.log("vote", id);
    dispatch(addVote(id));
  };

  const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes);

  return (
    <div id="anecdote-list-component">
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id} className="anecdote-row">
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)} id="vote-button">
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteList;
