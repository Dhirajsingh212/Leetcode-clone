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
      python: "python:3.8.19-alpine3.20",
      javascript: "node:21-alpine",
    };

    if (!services[language]) {
      return { msg: "Failed, compiler not found" };
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
        Binds: [`${path.dirname(filename)}:/code`],
      },
    });

    await container.start();

    const stream = await container.attach({
      stream: true,
      stdout: true,
      stderr: true,
    });

    let output = "";
    stream.on("data", async (chunk) => {
      const chunkStr = await chunk.toString("utf-8");
      const cleanedChunk = chunkStr.replace(/[^\x20-\x7E\n]/g, "");
      output += cleanedChunk.trim();
    });

    await container.wait();
    await container.remove();

    fs.unlinkSync(filename);

    console.log(output);

    return { output: output.trim() };
  } catch (err) {
    console.error(err);
    return { msg: "Error occurred during execution" };
  }
}
