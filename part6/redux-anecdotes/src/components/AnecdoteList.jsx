// AnecdoteList.jsx

import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    return state;
  });


  // TODO
  const handleVote = (id) => {
    // console.log("vote", id);

    dispatch(addVote(id));
  };

  const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteList;
