"use client";

import Header from "@/components/Header";
import { problemsData } from "@/data";
import { useParams } from "next/navigation";

export default function Component() {
  const { id } = useParams();

  const problemById = problemsData.filter((element: any) => {
    return element.id == id[0];
  })[0];

  const color = (tag: string) => {
    console.log(tag);
    if (tag == "Easy") {
      return "green-500 ";
    } else if (tag == "Medium") {
      return "yellow-500";
    }
    return "rose-600";
  };

  const tagColor = color(problemById.tag);

  console.log(tagColor);

  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_710px] gap-8 w-full px-4 md:px-10 py-10 ">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{problemById.title}</h1>
            <p className="text-muted-foreground mt-2">
              {problemById.description}
            </p>
            <p
              className={`border px-2 text-${tagColor} w-20 text-center rounded-lg border-${tagColor} my-4`}
            >
              {problemById.tag}
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Example</h2>
            {problemById.examples.map((element: any, index: number) => {
              return (
                <div className="bg-muted rounded-md p-4" key={index}>
                  <p className="text-muted-foreground">
                    Input: {element.input}
                    <br />
                    Output: {element.output}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Constraints</h2>
            <ul className="list-disc pl-6 text-muted-foreground">
              {problemById.constraints.map((element: any, index: number) => {
                return <li key={index}>{element}</li>;
              })}
              <li>{"-5000 < />= Node.val < />= 5000"}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
