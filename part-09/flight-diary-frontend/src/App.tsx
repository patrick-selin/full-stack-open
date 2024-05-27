import "./App.css";
import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import DiaryForm from "./components/DiaryForm";
import DiaryEntryList from "./components/DiaryEntryList";
import { getAllDiaries } from "./services/diaries";
//
import { DiaryEntry, NewDiaryEntry } from "./types";
function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  //
  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);
  //

  const handleDiaryAdded = (newDiary: NewDiaryEntry) => {
    setDiaries([...diaries, newDiary]);
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

      <DiaryForm
        onDiaryAdded={handleDiaryAdded}
        setNotification={setNotification}
      />

      <h2>Diary Entries</h2>
      <DiaryEntryList diaries={diaries} />
    </>
  );
}

export default App;
