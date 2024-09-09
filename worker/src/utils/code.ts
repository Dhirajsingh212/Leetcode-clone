import { spawn } from "child_process";
import fs from "fs";

interface ExecutionResult {
  output: string;
}

function getExtension(language: string) {
  if (language === "python") {
    return "py";
  } else if (language === "javascript") {
    return "js";
  }
}

function getImage(language: string) {
  if (language === "javascript") {
    return "node:21-alpine";
  } else if (language === "python") {
    return "python:3.8.19-alpine3.20";
  }
}

function getRunCommand(language: string) {
  if (language === "javascript") {
    return "node";
  } else if (language === "python") {
    return "python3";
  }
}

export const handleCode = async (
  userCode: string,
  language: string
): Promise<ExecutionResult> => {
  const extension = getExtension(language);
  const image = getImage(language);
  const runCommand = getRunCommand(language);

  const fileName = `main.${extension}`;
  const filePath = `${__dirname}/${fileName}`;
  fs.writeFileSync(filePath, userCode, "utf-8");

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

    let outputValue = "";

    dockerContainer.stdout.on("data", (data) => {
      outputValue += data.toString();
    });

    dockerContainer.stderr.on("data", (stderr) => {
      console.error(`Docker container stderr: ${stderr}`);
    });

    dockerContainer.on("close", (code) => {
      fs.unlinkSync(filePath);
      resolve({ output: outputValue });
    });
  });
};
