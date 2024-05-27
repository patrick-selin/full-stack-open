// services/anecdotes.js

import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getRandomId = () => (100000 * Math.random()).toFixed(0);

const createNew = async (content) => {
  const object = { content, id: getRandomId(), votes: 0 }
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const updateVote = async (anecdote) => {
  console.log(`ANECDOTE IS ::: ${anecdote}`)
  
  const updatedVotes = { ...anecdote, votes: anecdote.votes + 1}
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedVotes)
  return response.data;
};

export default { getAll, createNew, updateVote }