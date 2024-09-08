import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { StarIcon } from "@/icons";
import Link from "next/link";

const QuestionCard = () => {
  return (
    <Card className="bg-card-foreground text-card-foreground py-4 dark:bg-slate-800 dark:text-white">
      <CardContent>
        <div className="flex items-center justify-between my-2">
          <div className="bg-primary px-2 py-1 rounded-md text-xs font-medium text-primary-foreground">
            Easy
          </div>
          <StarIcon className="w-4 h-4 text-yellow-500" />
        </div>
        <h3 className="text-lg font-bold mb-2">Two Sum</h3>
        <p className="text-sm text-muted-foreground line-clamp-3">
          Given an array of integers nums and an integer target, return indices
          of the two numbers such that they add up to target.
        </p>
      </CardContent>
      <CardFooter>
        <Link
          href="#"
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
