// types

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export type NewDiaryEntry = Omit<DiaryEntry, "id">;

//

export interface NotificationProps {
  message: string;
  onClose: () => void;
}

export interface DiaryFormProps {
  onDiaryAdded: (diary: DiaryEntry) => void;
  setNotification: (notification: string | null) => void;
}
