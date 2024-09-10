type ProblemData = {
  input: string;
  output: string;
};

export const cleanProblemData = (data: ProblemData): ProblemData => {
  const cleanedInput = data.input.trim().replace(/\s+/g, " ");
  // .replace(/\n/g, " ");

  const cleanedOutput = data.output
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\n/g, " ");

  return {
    input: cleanedInput,
    output: cleanedOutput,
  };
};
