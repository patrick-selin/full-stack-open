type Operation = "multiply" | "add" | "divide";

const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multiply":
      return a * b;
    case "add":
      return a + b;
    case "divide":
      if (b === 0) {
        throw new Error("Can't divide by 0");
      }
      return a / b;
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

const multiplicator = (a: number, b: number, printText: string): void => {
  console.log(printText, a * b);
};

multiplicator(2, 4, "Multiplied numbers 2 and 4, the result is:");

try {
  const tulos = calculator(1, 2, "add");
} catch (error: unknown) {
  let errorMessage = "Something went wrong ";

  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

// const tulos = calculator(1, 2, "add");
// const tulos2 = calculator(8, 0, "divide");

// console.log(tulos);
// console.log(tulos2);
