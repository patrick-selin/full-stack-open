import { useState } from "react";
import { createDiary } from '../services/diaries';
import { Weather, Visibility, DiaryFormProps } from '../types';

const DiaryForm = ({ onDiaryAdded, setNotification }: DiaryFormProps) => {
  const [newDiary, setNewDiary] = useState({
    date: '',
    weather: '',
    visibility: '',
    comment: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDiary({ ...newDiary, [name]: value });
  };

  const handleSubmit = async (event) => {
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
          type="text"
          name="date"
          value={newDiary.date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        Weather:
        <input
          type="text"
          name="weather"
          value={newDiary.weather}
          onChange={handleInputChange}
        />
      </div>
      <div>
        Visibility:
        <input
          type="text"
          name="visibility"
          value={newDiary.visibility}
          onChange={handleInputChange}
        />
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