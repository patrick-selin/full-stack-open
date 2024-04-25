const calculateBmi = (height: number, weight: number): string  => {
    if (height === 0 || weight === 0) {
        throw new Error("Zero is not valid.");
      }  

  const bmiRaw = weight / ((height / 100) * (height / 100));
  const bmi = Number(bmiRaw.toFixed(1)); 
  console.log(bmi);

  let returnMessage = ""

  if (bmi < 18.5) {
    returnMessage = "Underweight"
  } else if (bmi >= 18.5 && bmi < 24.9) {
    returnMessage = "Normal range"
  } else if (bmi >= 25 && bmi < 29.9) {
    returnMessage = "Overweight"
  } else if (bmi >= 30) {
    returnMessage = "Obese"
  } 
  return returnMessage;
};

try {
    console.log(calculateBmi(170, 70));
} catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
  
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
