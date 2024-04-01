// AnecdoteList.jsx
import { useSelector, useDispatch } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";

import {
  notificationSet,
  notificationClear,
} from "../reducers/notificationReducer";

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
    console.log(`THIS IS anecdote :: ${anecdote}`);
    // voting
    dispatch(increaseVote(anecdote));

    // notification
    dispatch(notificationSet(`your vote is added to: ${anecdote.content}`));
    setTimeout(() => {
      dispatch(notificationClear(""));
    }, 5000);
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
