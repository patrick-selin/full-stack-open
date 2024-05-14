import "./App.css";
import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import { getAllDiaries, createDiary } from "./services/diaries";
//
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from "./types";
function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({} as NewDiaryEntry);
  const [notification, setNotification] = useState<string | null>(null);
  //
  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);
  //

  const createNewDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary(newDiary)
      .then((data) => {
        setDiaries(diaries.concat(data));
        setNewDiary({} as NewDiaryEntry);
      })
      .catch((error) => {
        setNotification(error.response.data);
      });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <>
      <h2>Add new entry</h2>
      {notification && (
        <Notification message={notification} onClose={closeNotification} />
      )}

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
                weather: event.target.value as Weather,
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
                visibility: event.target.value as Visibility,
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
