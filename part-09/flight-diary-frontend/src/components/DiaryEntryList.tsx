import { DiaryEntryListProps } from '../types';

const DiaryEntryList = ({ diaries }: DiaryEntryListProps) => {
  return (
    <ul>
      {diaries.map((diary, index) => (
        <li key={index}>
          <h3>{diary.date}</h3>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
        </li>
      ))}
    </ul>
  );
};

export default DiaryEntryList;