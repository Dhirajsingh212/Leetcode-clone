import { spawn } from "child_process";
import fs from "fs";
import readline from "readline";

interface ExecutionResult {
  output: string;
  success: boolean;
  error: boolean;
}

interface TestCase {
  input: string;
  output: string;
}

function getExtension(language: string): string {
  if (language === "python") {
    return "py";
  } else if (language === "javascript") {
    return "js";
  }
  throw new Error("Unsupported language");
}

function getImage(language: string): string {
  if (language === "javascript") {
    return "node:21-alpine";
  } else if (language === "python") {
    return "python:3.8.19-alpine3.20";
  }
  throw new Error("Unsupported language");
}

function getRunCommand(language: string): string {
  if (language === "javascript") {
    return "node";
  } else if (language === "python") {
    return "python3";
  }
  throw new Error("Unsupported language");
}

export const handleCode = async (
  userCode: string,
  language: string,
  testCases: TestCase
): Promise<ExecutionResult> => {
  const extension = getExtension(language);
  const image = getImage(language);
  const runCommand = getRunCommand(language);

  const fileName = `main.${extension}`;
  const filePath = `${__dirname}/${fileName}`;
  fs.writeFileSync(filePath, userCode, "utf-8");

  const customInput = testCases.input.replace("\r", "").replace(/\s/g, "\n");

  const inputFilePath = "input.txt";
  const expectedOutput = testCases.output
    .replace("\r", "")
    .replace(/\s/g, "\n");

  fs.writeFileSync(inputFilePath, customInput, "utf-8");

  return new Promise<ExecutionResult>((resolve) => {
    const dockerContainer = spawn(
      "docker",
      [
        "run",
        "--rm",
        "-i",
        "-v",
        `${__dirname}:/code`,
        `${image}`,
        `${runCommand}`,
        `/code/main.${extension}`,
      ],
      {
        stdio: ["pipe", "pipe", "pipe"],
      }
    );

    const rl = readline.createInterface({
      input: fs.createReadStream(inputFilePath),
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      dockerContainer.stdin.write(line + "\n");
    });

    rl.on("close", () => {
      dockerContainer.stdin.end();
    });

    let outputValue = "";

    dockerContainer.stdout.on("data", (data) => {
      outputValue += data.toString();
    });
    let error: any = null;
    dockerContainer.stderr.on("data", (stderr) => {
      error = stderr.toString();
    });

    dockerContainer.on("close", (code) => {
      fs.unlinkSync(filePath);
      fs.unlinkSync(inputFilePath);
      if (error && !outputValue) {
        resolve({ output: error, success: false, error: true });
      }
      if (expectedOutput === outputValue.trim()) {
        resolve({
          output: "All test case passed",
          success: true,
          error: false,
        });
      }
      resolve({ output: outputValue, success: false, error: false });
    });
  });
};
