import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

const AnecdoteForm = () => {
  const createAnecdote = (newAnecdote) =>
    axios
      .post("http://localhost:3001/anecdotes", newAnecdote)
      .then((res) => res.data);

  const newAnecdoteMutation = useMutation({ mutationFn: createAnecdote });

  const getRandomId = () => (100000 * Math.random()).toFixed(0);

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");

    // react query
    newAnecdoteMutation.mutate({ 
      content: content,
      id: getRandomId(),
      votes: 0
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
