import { useState } from "react";
import { createDiary } from '../services/diaries';
import { DiaryFormProps, NewDiaryEntry, Weather, Visibility } from '../types';

const DiaryForm = ({ onDiaryAdded, setNotification }: DiaryFormProps) => {
  const [newDiary, setNewDiary] = useState({
    date: '',
    weather: '',
    visibility: '',
    comment: ''
  });

  const handleInputChange = (event: React.SyntheticEvent) => {
    const { name, value } = event.target;
    setNewDiary({ ...newDiary, [name]: value });
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const diary = await createDiary(newDiary);
      onDiaryAdded(diary);
      setNewDiary({
        date: '',
        weather: '',
        visibility: '',
        comment: ''
      });
    } catch (error) {
      setNotification(error.response.data);
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Date:
        <input
          type="date"
          name="date"
          value={newDiary.date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        Weather:
        {Object.values(Weather).map((weather) => (
          <label key={weather}>
            <input
              type="radio"
              name="weather"
              value={weather}
              checked={newDiary.weather === weather}
              onChange={handleInputChange}
            />{' '}
            {weather}
          </label>
        ))}
      </div>
      <div>
        Visibility:
        {Object.values(Visibility).map((visibility) => (
          <label key={visibility}>
            <input
              type="radio"
              name="visibility"
              value={visibility}
              checked={newDiary.visibility === visibility}
              onChange={handleInputChange}
            />{' '}
            {visibility}
          </label>
        ))}
      </div>
      <div>
        Comment:
        <input
          type="text"
          name="comment"
          value={newDiary.comment}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Add Diary Entry</button>
    </form>
  );
};

export default DiaryForm;