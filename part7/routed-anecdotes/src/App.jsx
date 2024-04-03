// App.jsx

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import About from "./components/About";
import AnecdoteList from "./components/AnecdoteList";
import CreateNew from "./components/CreateNew";
import AnecdoteDetail from "./components/AnecdoteDetail";
//

const App = () => {
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

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

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
  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <section style={mainStyle}>
          {/* router */}
          <Routes>
            <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
            <Route path="/create" element={<CreateNew addNew={addNew} />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/anecdotes/:id"
              element={<AnecdoteDetail anecdotes={anecdotes} />}
            />
          </Routes>
          {/* router */}
        </section>
        <Footer />
      </div>
    </Router>
  );
};
export default App;
