import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, updateVotes } from "./services/anecdotes";

const App = () => {
  const queryClient = useQueryClient();

  const updateAnecdoteVoteseMutation = useMutation({
    mutationFn: updateVotes,
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    retry: 1,
  });
  // console.log(JSON.parse(JSON.stringify(`HUU:: ${result}`)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return (
      <>
        <p>Anecdote service not available due to problems in server</p>
        <p>Eror: {result.error.message}</p>
      </>
    );
  }
  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    updateAnecdoteVoteseMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
