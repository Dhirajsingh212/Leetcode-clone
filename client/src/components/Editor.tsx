"use client";
import React, { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Editor from "@monaco-editor/react";
import Spinner from "./Spinner";
import { Button } from "./ui/button";
import { useRecoilValue } from "recoil";
import { userState } from "@/atoms";
import axios from "axios";
import { BASE_URL } from "@/app/config";
import { toast } from "sonner";

export function EditorComp({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean;
  setIsLoading: (e: boolean) => void;
}) {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState<string>("javascript");
  const [theme, setTheme] = useState<string>("vs-dark");
  const userStateValue = useRecoilValue(userState);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  async function showValue() {
    setIsLoading(true);
    const code = (editorRef?.current as any).getValue();
    try {
      const data = await axios.post(`${BASE_URL}code/submit`, {
        problemId: 1,
        userId: userStateValue.userId,
        code: code,
        language: language,
      });
      toast.success(data.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col bg-slate-950 gap-4 p-4 rounded-lg">
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4">
          <Select
            onValueChange={(e) => {
              setLanguage(e);
            }}
          >
            <SelectTrigger className="w-[180px] text-white">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">Javascript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(e) => {
              setTheme(e);
            }}
          >
            <SelectTrigger className="w-[180px] text-white">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">light</SelectItem>
              <SelectItem value="vs-dark">dark</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button disabled={isLoading} onClick={showValue}>
          {isLoading ? <Spinner /> : "Run"}
        </Button>
      </div>
      <Editor
        theme={theme}
        height="90vh"
        language={language}
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
        loading={<Spinner />}
      />
    </div>
  );
}
