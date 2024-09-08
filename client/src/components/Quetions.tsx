import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { StarIcon } from "@/icons";
import Link from "next/link";
import SortByMenu from "./SortByMenu";
import QuestionCard from "./QuestionCard";

const Quetions = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Coding Problems</h1>
        <SortByMenu />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 100 }).map((element: any, index: number) => {
          return <QuestionCard key={index} />;
        })}
      </div>
    </div>
  );
};

export default Quetions;
