import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";


const App = () => {
  // fetcaa data
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())  
  }, [dispatch]) 

  return (
    <div id="main-app">
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
