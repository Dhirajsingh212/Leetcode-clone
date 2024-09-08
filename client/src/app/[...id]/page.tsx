"use client";

import { EditorComp } from "@/components/Editor";
import Header from "@/components/Header";
import { problemsData } from "@/data";
import { useParams } from "next/navigation";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import AuthCheck from "@/components/AuthCheck";

export default function Component() {
  const { id } = useParams();

  const problemById = problemsData.filter((element: any) => {
    return element.id == id[0];
  })[0];

  const color = (tag: string) => {
    if (tag === "Easy") {
      return "green-500";
    } else if (tag === "Medium") {
      return "yellow-500";
    }
    return "rose-600";
  };

  const tagColor = color(problemById.tag);

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
                      className={`border px-3 py-1 inline-block text-${tagColor} w-fit text-center text-sm md:text-base rounded-lg border-${tagColor} my-4`}
                    >
                      {problemById.tag}
                    </p>
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
                        <p className="text-muted-foreground">
                          Input: {element.input}
                          <br />
                          Output: {element.output}
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

            <PanelResizeHandle className="w-2 bg-gray-300 cursor-col-resize" />

            <Panel
              defaultSize={60}
              minSize={20}
              className="min-w-0 overflow-hidden"
            >
              <EditorComp />
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </AuthCheck>
  );
}
