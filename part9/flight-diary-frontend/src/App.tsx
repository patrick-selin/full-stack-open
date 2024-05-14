import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAllDiaries, createDiary } from "./services/diaries";
//
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from "./types";
function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({} as NewDiaryEntry);
  //
  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);
  //

  const createNewDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(newDiary);

    axios
      .post<DiaryEntry>("http://localhost:3003/api/diaries", newDiary)
      .then((response) => {
        setDiaries(diaries.concat(response.data));
      });
    setNewDiary({} as NewDiaryEntry);
  };

  return (
    <>
      <h2>Diary Entries</h2>
      <form onSubmit={createNewDiary}>
        <div>
          date
          <input
            value={newDiary.date || ""}
            onChange={(event) =>
              setNewDiary((prevState) => ({
                ...prevState,
                date: event.target.value,
              }))
            }
          />
        </div>
        <div>
          weather
          <input
            value={newDiary.weather || ""}
            onChange={(event) =>
              setNewDiary((prevState) => ({
                ...prevState,
                weather: event.target.value,
              }))
            }
          />
        </div>
        <div>
          visibility
          <input
            value={newDiary.visibility || ""}
            onChange={(event) =>
              setNewDiary((prevState) => ({
                ...prevState,
                visibility: event.target.value,
              }))
            }
          />
        </div>
        <div>
          comment
          <input
            value={newDiary.comment || ""}
            onChange={(event) =>
              setNewDiary((prevState) => ({
                ...prevState,
                comment: event.target.value,
              }))
            }
          />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Diary Entries</h2>
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
