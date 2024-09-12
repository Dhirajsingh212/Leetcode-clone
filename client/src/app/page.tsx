"use client";

import AuthCheck from "@/components/AuthCheck";
import Catagories from "@/components/Catagories";
import Header from "@/components/Header";
import Quetions from "@/components/Quetions";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Component() {
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark" ? true : false);

  return (
    <AuthCheck>
      <div
        className={`flex flex-col min-h-[100dvh] ${isDarkMode ? "dark" : ""}`}
      >
        <Header />
        <div className="flex-1 bg-background text-foreground px-4 md:px-10">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[900px_1fr] gap-8 py-8">
            <Quetions />
            hhhhhhhhhhhhh
            <div>
              <Catagories />
            </div>
          </div>
        </div>
      </div>
    </AuthCheck>
  );
}
