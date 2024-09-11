import { spawn } from "child_process";
import fs from "fs";
import readline from "readline";
import path from "path";

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

export const handleJavaCode = async (
  code: string,
  testCases: TestCase
): Promise<ExecutionResult> => {
  const fileName = "Main.java";
  const filePath = path.join(__dirname, fileName);
  const compiledFilePath = path.join(__dirname, "Main.class");

  fs.writeFileSync(filePath, code, "utf-8");

  const compileCommand = `docker run --rm -v "${__dirname}:/code" openjdk:21 javac /code/${fileName}`;

  const compileResult = await runCommand(compileCommand);

  if (compileResult.error) {
    fs.unlinkSync(filePath);

    return {
      output: `Compilation error: ${compileResult.output}`,
      error: true,
      success: false,
    };
  }

  const result = await runJavaCode(testCases);

  fs.unlinkSync(filePath);
  fs.unlinkSync(compiledFilePath);

  return result;
};

const runCommand = (
  command: string
): Promise<{ output: string; error: boolean }> => {
  return new Promise((resolve) => {
    const process = spawn(command, { shell: true });

    let output = "";
    let errorOutput = "";

    process.stdout.on("data", (data) => {
      output += data.toString();
    });

    process.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    process.on("close", (code) => {
      resolve({
        output: errorOutput,
        error: code !== 0,
      });
    });
  });
};

const runJavaCode = (testCases: TestCase): Promise<ExecutionResult> => {
  return new Promise((resolve) => {
    const inputFilePath = path.join(__dirname, "input.txt");
    const expectedOutput = testCases.output
      .replace("\r", "")
      .replace(/\s/g, "\n");

    fs.writeFileSync(
      inputFilePath,
      testCases.input.replace("\r", "").replace(/\s/g, "\n"),
      "utf-8"
    );

    const dockerCommand = [
      "run",
      "--rm",
      "-i",
      "-v",
      `${__dirname}:/code`,
      "openjdk:21",
      "java",
      "-cp",
      "/code",
      "Main",
    ];

    const dockerContainer = spawn("docker", dockerCommand, {
      stdio: ["pipe", "pipe", "pipe"],
    });

    const inputStream = fs.createReadStream(inputFilePath);
    inputStream.pipe(dockerContainer.stdin);

    let outputValue = "";
    let error: string | null = null;

    dockerContainer.stdout.on("data", (data) => {
      outputValue += data.toString();
    });

    dockerContainer.stderr.on("data", (stderr) => {
      console.error(`Docker container stderr: ${stderr}`);
      error = stderr.toString();
    });

    dockerContainer.on("close", (code) => {
      fs.unlinkSync(inputFilePath);
      if (error) {
        resolve({
          output: error,
          success: false,
          error: true,
        });
      } else if (expectedOutput.trim() === outputValue.trim()) {
        resolve({
          output: "All test cases passed",
          success: true,
          error: false,
        });
      } else {
        resolve({
          output: outputValue,
          success: false,
          error: false,
        });
      }
    });
  });
};
