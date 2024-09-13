"use client";

import AuthCheck from "@/components/AuthCheck";
import { EditorComp } from "@/components/Editor";
import Header from "@/components/Header";
import OutputWindow from "@/components/OutputWindow";
import Spinner from "@/components/Spinner";
import { problemsData } from "@/data";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { toast } from "sonner";

export default function Component() {
  const { id } = useParams();

  const problemById = problemsData.filter((element: any) => {
    return element.id == id[0];
  })[0];

  const [socket, setSocket] = useState<WebSocket | null>();
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8000");

    newSocket.onopen = () => {
      toast.success("Connection established.");
      setSocket(newSocket);
    };

    newSocket.onmessage = (message) => {
      setMessage(message.data);
      setIsLoading(false);
    };

    newSocket.onclose = (event) => {
      toast.error("Disconnected please reload the page.");
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  if (!socket) {
    return (
      <div className="flex flex-row items-center justify-center h-screen w-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <AuthCheck>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow w-full px-4 md:px-8 py-6 md:py-10">
          <PanelGroup
            direction="horizontal"
            className="grid grid-cols-1 md:grid-cols-[1fr_710px] gap-6 w-full h-full"
          >
            <Panel defaultSize={40} minSize={20}>
              <div className="min-w-0 h-[500px] md:h-[600px] overflow-y-scroll no-scrollbar pb-6">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                      {problemById.title}
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground mt-2">
                      {problemById.description}
                    </p>
                    <p
                      className={cn(
                        `border px-3 py-1 inline-block  w-fit text-center text-sm md:text-base rounded-lg  my-4`,
                        {
                          "text-green-500 border-green-500":
                            problemById.tag === "Easy",
                          "text-yellow-500 border-yellow-500":
                            problemById.tag === "Medium",
                          "text-rose-500 border-rose-500":
                            problemById.tag === "Hard",
                        }
                      )}
                    >
                      {problemById.tag}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-lg md:text-xl font-semibold">
                      Explanation
                    </h2>
                    <div className="text-gray-600 dark:text-gray-300  bg-gray-200 dark:bg-slate-800 rounded-lg pr-8">
                      <p className=" whitespace-pre overflow-x-scroll no-scrollbar">
                        {problemById.explanation}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-lg md:text-xl font-semibold">
                      Example
                    </h2>
                    {problemById.examples.map((element: any, index: number) => (
                      <div
                        className="bg-muted rounded-md p-4 text-sm md:text-base"
                        key={index}
                      >
                        <p className="text-muted-foreground whitespace-pre">
                          Input:
                          <br />
                          {element.input}
                          <br />
                          <br />
                          Output:
                          <br />
                          {element.output}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-lg md:text-xl font-semibold">
                      Constraints
                    </h2>
                    <ul className="list-disc pl-6 text-sm md:text-base text-muted-foreground">
                      {problemById.constraints.map(
                        (element: any, index: number) => (
                          <li key={index}>{element}</li>
                        )
                      )}
                      <li>{"-5000 < />= Node.val < />= 5000"}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Panel>

            <PanelResizeHandle className="border hover:border-blue-700" />

            <Panel
              defaultSize={60}
              minSize={20}
              className="min-w-0 overflow-hidden"
            >
              <PanelGroup direction="vertical" className="gap-4">
                <Panel defaultSize={60} minSize={20}>
                  <EditorComp
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    testCases={problemById.examples[0]}
                  />
                </Panel>

                <PanelResizeHandle className="border hover:border-blue-700" />
                <Panel defaultSize={20} minSize={20}>
                  <OutputWindow message={message} isLoading={isLoading} />
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </AuthCheck>
  );
}
