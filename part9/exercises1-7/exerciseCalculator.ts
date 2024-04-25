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
  trainingData: number[],
  targetHours: number
): WeeklyTrainingData => {
  //
  const periodLength = trainingData.length;
  //
  const trainingDaysFiltered = trainingData.filter((hours) => hours > 0);
  const trainingDays = trainingDaysFiltered.length;
  //
  const totalTrainingHours: number = trainingData.reduce((a, b) => a + b, 0);
  const averageTainingHours = totalTrainingHours / trainingData.length;
  //
  let rating: number;
  let ratingDescription: string;

  if (averageTainingHours < targetHours) {
    rating = 1;
    ratingDescription = "Under the Target. Time to impove a bit.";
  } else if (averageTainingHours === targetHours) {
    rating = 2;
    ratingDescription = "Good job. You hit the target.";
  } else if (averageTainingHours > targetHours) {
    rating = 3;
    ratingDescription = "You went above the target. You are a machine!";
  }

  const stats: WeeklyTrainingData = {
    periodLength,
    trainingDays,
    success: averageTainingHours > targetHours,
    rating,
    ratingDescription,
    target: targetHours,
    average: averageTainingHours,
  };

  return stats;
};

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log("object");
    console.log(value1, value2);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong ";
  
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }

// [3, 0, 2, 4.5, 0, 3, 1] and 2
const send = calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
console.log(send);
