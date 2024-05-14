import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
//
import { DiaryEntry } from './types';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  // const [newDiary, setNewDiary] = useState("");
  //
  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3003/api/diaries")
      .then((response) => {
        setDiaries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching diaries:", error);
      });
  }, []);
  //

  return (
    <>
      <h1>Diary Entries</h1>
      <ul>
        {diaries.map((diary, index) => (
          <li key={index}>
            <h3>{diary.date}</h3>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
