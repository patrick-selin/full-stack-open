const anecdotesAtStart = [
  "If it hurts, do it more often",
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

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "ADD_VOTE": {
      const newAnecdoteId = action.payload.id;
      const anecdoteToVote = state.find(
        (anecdote) => anecdote.id === newAnecdoteId
      );
      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== newAnecdoteId ? anecdote : updatedAnecdote
      );
    }
    case "ADD_ANECDOTE":
      return [...state, action.payload];

    default:
      return state;
  }
};

export const addVote = (id) => {
  return {
    type: "ADD_VOTE",
    payload: { id },
  };
};

export const addAnecdote = (content) => {
  return {
    type: "ADD_ANECDOTE",
    payload: {
      content,
      id: getRandomId(),
      votes: 0,
    },
  };
};

export default reducer;
