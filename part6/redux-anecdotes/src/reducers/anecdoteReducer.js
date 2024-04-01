import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    // addVote(state, action) {
    //   const id = action.payload;
    //   const anecdoteToVote = state.find((a) => a.id === id);
    //   const changedAnecdote = {
    //     ...anecdoteToVote,
    //     votes: anecdoteToVote.votes + 1,
    //   };
    //   console.log(JSON.parse(JSON.stringify(state)));

    //   return state.map((anecdote) =>
    //     anecdote.id !== id ? anecdote : changedAnecdote
    //   );
    // },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const increaseVote = (anecdote) => {
  // console.log(`REDUX anecdote :: ${anecdote}`);
  return async (dispatch) => {
    await anecdoteService.updateVote(anecdote)
    const updatedAnecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(updatedAnecdotes)) 
  };
};

export const { addAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
