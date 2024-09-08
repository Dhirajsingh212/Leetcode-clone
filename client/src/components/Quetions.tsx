import { problemsData } from "@/data";
import QuestionCard from "./QuestionCard";
import SortByMenu from "./SortByMenu";

const Quetions = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Coding Problems</h1>
        <SortByMenu />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problemsData.map((element: any, index: number) => {
          return (
            <QuestionCard
              id={element.id}
              tag={element.tag}
              title={element.title}
              description={element.description}
              examples={element.examples}
              constraints={element.constraints}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Quetions;
