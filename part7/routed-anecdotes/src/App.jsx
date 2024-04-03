// App.jsx

import { useState } from "react";
import { useMatch, Routes, Route, useNavigate } from "react-router-dom";
//
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import About from "./components/About";
import AnecdoteList from "./components/AnecdoteList";
import CreateNew from "./components/CreateNew";
import AnecdoteDetail from "./components/AnecdoteDetail";
//

const App = () => {
  const [notification, setNotification] = useState(null);
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 6,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 7,
      id: 2,
    },
  ]);

  const navigate = useNavigate();

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    //
    navigate("/");
    setNotification(`a new anecdote ${anecdote.content} created!`);
    setTimeout(() => setNotification(null), 5000);
  };

  const match = useMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const mainStyle = {
    border: "2px solid black",
    borderRadius: "1rem",
    backgroundColor: "lightgrey",
    padding: "1rem",
    marginTop: "3rem",
    marginBottom: "3rem",
  };

  const notificationStyle = {
    border: "3px solid green",
    borderRadius: "1rem",
    backgroundColor: "lightgrey",
    padding: "0.5rem",
    marginTop: "2rem",
    fontWeight: "700",
    fontSize: "1.5rem",
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && <div style={notificationStyle}>{notification}</div>}
      <section style={mainStyle}>
        {/* router */}
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/anecdotes/:id"
            element={<AnecdoteDetail anecdote={anecdote} />}
          />
        </Routes>
        {/* router */}
      </section>
      <Footer />
    </div>
  );
};
export default App;
