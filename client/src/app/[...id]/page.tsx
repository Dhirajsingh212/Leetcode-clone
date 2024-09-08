"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Component() {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8 w-full px-4 md:px-10 py-10 ">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Reverse a Linked List</h1>
            <p className="text-muted-foreground mt-2">
              Given the head of a singly linked list, reverse the list and
              return the new head.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Example</h2>
            <div className="bg-muted rounded-md p-4">
              <p className="text-muted-foreground">
                Input: head = [1,2,3,4,5]
                <br />
                Output: [5,4,3,2,1]
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Constraints</h2>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>
                The number of nodes in the list is in the range [0, 5000].
              </li>
              <li>{"-5000 < />= Node.val < />= 5000"}</li>
            </ul>
          </div>
        </div>
        <div className="bg-background rounded-md border shadow-sm">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Code Editor</h2>
          </div>
          <div className="p-4 space-y-4">
            <div className="bg-muted rounded-md p-4">
              <div className="text-sm" />
            </div>
            <div className="flex justify-end">
              <Button>Run Tests</Button>
            </div>
            <div className="bg-muted rounded-md p-4">
              <h3 className="text-lg font-semibold mb-2">Test Cases</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Test 1:</span>
                  <span className="text-green-500">Passed</span>
                </div>
                <div className="flex justify-between">
                  <span>Test 2:</span>
                  <span className="text-green-500">Passed</span>
                </div>
                <div className="flex justify-between">
                  <span>Test 3:</span>
                  <span className="text-red-500">Failed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
