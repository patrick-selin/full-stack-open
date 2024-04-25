// make interface
interface MultiplyValues {
  value1: number;
  value2: number;
}

// process.argv.forEach((arg, index) => {
//   console.log(`Argument ${index}: ${arg}`);
// });

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  }
  if (args.length > 4) {
    throw new Error("Too many arguments");
  }

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  if (height === 0 || weight === 0) {
    throw new Error("Zero is not valid.");
  }

  const bmiRaw = weight / ((height / 100) * (height / 100));
  const bmi = Number(bmiRaw.toFixed(1));
  //   console.log(bmi);

  let returnMessage = "";

  if (bmi < 18.5) {
    returnMessage = "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    returnMessage = "Normal range";
  } else if (bmi >= 25 && bmi < 29.9) {
    returnMessage = "Overweight";
  } else if (bmi >= 30) {
    returnMessage = "Obese";
  }
  return returnMessage;
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  //   console.log(value1, value2);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";

  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
