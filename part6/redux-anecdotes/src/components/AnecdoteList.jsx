// AnecdoteList.jsx
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { notificationSet } from "../reducers/notificationReducer";
import { Children } from "react";

function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === "ALL") {
      return anecdotes;
    }
    return anecdotes.filter((anecdoteItem) => {
      return anecdoteItem.content.toLowerCase().includes(filter.toLowerCase());
    });
  });

  const handleVote = (anecdote) => {
    // console.log("vote", id);
    console.log(`THIS IS anecdote.content :: ${anecdote.content}`);
    dispatch(addVote(anecdote.id));
    dispatch(notificationSet(`you voted '${anecdote.content}`));
  };

  const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes);

  return (
    <div id="anecdote-list-component">
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id} className="anecdote-row">
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)} id="vote-button">
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteList;
