import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
import { notificationSetter } from "../reducers/notificationReducer";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
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
    dispatch(notificationSetter(`New Anecdote added: '${content}'`, 4));
  };
};

export const increaseVote = (anecdote) => {
  // console.log(`REDUX anecdote :: ${anecdote}`);
  return async (dispatch) => {
    await anecdoteService.updateVote(anecdote);
    const updatedAnecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(updatedAnecdotes));
    dispatch(notificationSetter(`you voted '${anecdote.content}'`, 3));
  };
};

export const { addAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
