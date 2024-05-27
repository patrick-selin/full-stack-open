// make interface
interface MultiplyValues {
  value1: number;
  value2: number;
}
console.log(process.argv);

process.argv.forEach((arg, index) => {
  console.log(`Argument ${index}: ${arg}`);
});

// parse the arguments
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

// the program
const multiplicator = (a: number, b: number, printText: string): void => {
  console.log(printText, a * b);
};

multiplicator(2, 4, "Multiplied numbers 2 and 4, the result is:");

try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplicator(
    value1,
    value2,
    `Multiplied ${value1} and ${value2}, the result is:`
  );
} catch (error: unknown) {
  let errorMessage = "Something went wrong ";

  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
