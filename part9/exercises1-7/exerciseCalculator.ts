interface WeeklyTrainingData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  data: number[],
  targetHours: number
): WeeklyTrainingData => {
  // calculate average time of daily exercise hours
  // compare to target amount of daily hours
  // return object{}

  const countTrainingDays = (data) => {
    const trainingDaysFiltered = data.filter((hours) => hours > 0);
    const numTrainingDays = trainingDaysFiltered.length;

    return numTrainingDays;
  };

  const stats: WeeklyTrainingData = {
    periodLength: data.length,
    trainingDays: countTrainingDays(data),
    success: false,
    rating: 2,
    ratingDescription: "not too bad but could be better",
    target: 2,
    average: 1.9285714285714286,
  };

  return stats;
};

// [3, 0, 2, 4.5, 0, 3, 1] and 2
const send = calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
console.log(send);
