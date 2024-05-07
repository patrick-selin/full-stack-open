import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmiResult = calculateBmi(height, weight);

  return res.json({
    weight,
    height,
    bmi: bmiResult,
  });
});

//
app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((value) => typeof value !== "number") ||
    typeof target !== "number"
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  try {
    const exerciseStats = calculateExercises(daily_exercises, target);
    // console.log(`THIS :: :: ${JSON.stringify(exerciseStats)}`);

    return res.json(exerciseStats).status(200);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    }

    return res.status(400).send({ error: "something went wrong" });
  }
});
//

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
