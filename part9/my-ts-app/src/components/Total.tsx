import { ContentProps } from "../types";

function Total({ courseParts }: ContentProps) {
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );
  return <h2>Number of exercises {totalExercises}</h2>;
}

export default Total;
