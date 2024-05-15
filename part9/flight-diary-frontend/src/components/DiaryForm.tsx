import { useState } from "react";
import { createDiary } from '../services/diaries';
import { DiaryFormProps, NewDiaryEntry } from '../types';
import { AxiosError } from 'axios';

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
      const diary: NewDiaryEntry = await createDiary(newEntry);
      onDiaryAdded(diary);
      setNewDiary({
        date: '',
        weather: '',
        visibility: '',
        comment: ''
      });
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const responseData = axiosError.response.data;
          setNotification(responseData);
        }
      }
    }
  };

  function isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
  }
  

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