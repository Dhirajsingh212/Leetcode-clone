import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Catagories = () => {
  return (
    <div className="bg-card p-4 rounded-lg shadow-md ">
      <h3 className="text-lg font-bold mb-4">Categories</h3>
      <Accordion type="single" collapsible>
        <AccordionItem value="easy">
          <AccordionTrigger className="text-base">Easy</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="easy-array" /> Array
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="easy-string" /> String
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="easy-linked-list" /> Linked List
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="medium">
          <AccordionTrigger className="text-base">Medium</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="medium-tree" /> Tree
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="medium-graph" /> Graph
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="medium-dynamic-programming" /> Dynamic Programming
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="hard">
          <AccordionTrigger className="text-base">Hard</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="hard-backtracking" /> Backtracking
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="hard-greedy" /> Greedy
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="hard-divide-and-conquer" /> Divide and Conquer
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <h3 className="text-lg font-bold mt-6 mb-4">Filters</h3>
      <Accordion type="single" collapsible>
        <AccordionItem value="difficulty">
          <AccordionTrigger className="text-base">Difficulty</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="difficulty-easy" /> Easy
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="difficulty-medium" /> Medium
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="difficulty-hard" /> Hard
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="tags">
          <AccordionTrigger className="text-base">Tags</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="tag-array" /> Array
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="tag-string" /> String
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="tag-linked-list" /> Linked List
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="tag-tree" /> Tree
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="tag-graph" /> Graph
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="tag-dynamic-programming" /> Dynamic Programming
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="tag-backtracking" /> Backtracking
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="tag-greedy" /> Greedy
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox id="tag-divide-and-conquer" /> Divide and Conquer
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Catagories;
