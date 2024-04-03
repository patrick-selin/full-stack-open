// AnecdoteDetail.jsx

const AnecdoteDetail = ({ anecdote }) => {


  if (!anecdote) {
    return <div>Anecdote not found</div>;
  }

  return (
    <div>
      <h3>{anecdote.content}</h3>
      <p>Votes: {anecdote.votes}</p>
      <p>Author: {anecdote.author}</p>
      <p>
        For more info see {" "} <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

export default AnecdoteDetail;
