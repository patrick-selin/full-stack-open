import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState();
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const randomizer = () => {
    const max = anecdotes.length;
    const randomIndex = Math.floor(Math.random() * max);
    setSelected(randomIndex);
  };

  const voter = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
    console.log(votes);
  };

  const maxVotes = () => {
    const largestVotes = Math.max(...votes);
    const index = votes.indexOf(largestVotes);
    console.log(index);
    return anecdotes[index];
  };

  return (
    <>
      <h2>Anecdote of the date</h2>
      <div>{anecdotes[selected]}</div>
      <p>has {votes[selected]} votes</p>
      <Button text="vote" handleClick={voter} />
      <Button text="new anecdote" handleClick={randomizer} />

      <h2>Anecdote with most votes</h2>
      <div>{maxVotes()}</div>
    </>
  );
};

export default App;
