import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getRandomId = () => (100000 * Math.random()).toFixed(0);

const anecdoteAsObject = (anecdote) => {
  return {
    content: anecdote,
    id: getRandomId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(anecdoteAsObject);
// console.log("initial state -- ", initialState);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: initialState,
  reducers: {
    addVote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      console.log(JSON.parse(JSON.stringify(state)))

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },

    addAnecdote(state, action) {
      state.push(anecdoteAsObject(action.payload));
      console.log(JSON.parse(JSON.stringify(state)))
    },
  },
});

export const { addVote, addAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
