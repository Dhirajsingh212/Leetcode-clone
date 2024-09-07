import Docker from "dockerode";
import fs from "fs";
import path from "path";

const docker = new Docker();

export async function executeCode(
  code: string,
  language: "python" | "javascript"
) {
  try {
    const services = {
      python: "python:3.9",
      javascript: "node:21-alpine",
    };

    if (!services[language]) {
      return {
        message: "Failed, compiler not found",
      };
    }

    const filename = path.join(
      __dirname,
      `temp.${language === "python" ? "py" : "js"}`
    );
    fs.writeFileSync(filename, code);

    const container = await docker.createContainer({
      Image: services[language],
      Cmd: [
        language === "python" ? "python" : "node",
        `/code/${path.basename(filename)}`,
      ],
      AttachStdout: true,
      AttachStderr: true,
      HostConfig: {
        Binds: [`${path.dirname(filename)}:/code`], // Mount the directory
      },
    });

    await container.start();

    const stream = await container.attach({
      stream: true,
      stdout: true,
      stderr: true,
    });
    let output = "";
    stream.on("data", (chunk) => (output += chunk.toString()));

    await container.wait();

    await container.remove();

    fs.unlinkSync(filename);
    return { output };
  } catch (err) {
    console.error(err);
  }
}
