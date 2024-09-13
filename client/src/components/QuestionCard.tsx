import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { StarIcon } from "@/icons";
import Link from "next/link";

type Example = {
  input: string;
  output: string;
};

interface Problem {
  id: number;
  tag: string;
  title: string;
  description: string;
  examples: Example[];
  constraints: string[];
}

const QuestionCard = ({
  id,
  tag,
  title,
  description,
  examples,
  constraints,
}: Problem) => {
  return (
    <Card className="bg-violet-500 text-card-foreground py-4 dark:bg-slate-800 dark:text-white">
      <CardContent>
        <div className="flex items-center justify-between my-2">
          <div className="bg-primary px-2 py-1 rounded-md text-xs font-medium text-primary-foreground">
            {tag}
          </div>
          <StarIcon className="w-4 h-4 text-yellow-500" />
        </div>
        <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
        <p className="text-sm text-white line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/${id}`}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          prefetch={false}
        >
          Solve
        </Link>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
