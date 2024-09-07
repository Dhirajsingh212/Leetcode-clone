import fs from "fs";
import Docker from "dockerode";

export async function executeCode(
  code: string,
  language: "py" | "js" | "java"
) {
  try {
    const images = {
      py: "python:3.9",
      js: "node:21-alpine",
      java: "openjdk:11",
    };

    if (!images[language]) {
      return {
        message: "Failed, compiler not found",
      };
    }
    const docker = new Docker();

    const filename = `temp.${language}`;
    fs.writeFileSync(filename, code);

    const container = await docker.createContainer({
      Image: images[language],
      Cmd: [language === "py" ? "python" : "node", filename], // Adjust command based on language
      AttachStdout: true,
      AttachStderr: true,
      Tty: false,
    });

    await container.start();
    const stream = await container.attach({
      stream: true,
      stdout: true,
      stderr: true,
    });

    let output = "";
    stream.on("data", (chunk) => {
      output += chunk.toString();
    });

    await container.wait();
    await container.remove();

    // fs.unlinkSync(filename);

    return { output };
  } catch (err) {
    console.error(err);
  }
}
