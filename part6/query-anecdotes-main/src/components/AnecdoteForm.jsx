import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createNew } from "../services/anecdotes";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
    onError: () => {
      dispatch({
        type: "ERROR",
        payload: "too short anecdote, must have length 5 or more",
      });
      setTimeout(() => {
        dispatch({ type: "TIMEOUT" });
      }, 4000);
    },
  });

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
      votes: 0,
    });

    dispatch({ type: "CREATE", payload: `anecdote '${content}' created` });
    setTimeout(() => {
      dispatch({ type: "TIMEOUT" });
    }, 3000);
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
