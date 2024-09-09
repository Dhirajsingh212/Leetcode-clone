"use client";
import { CodeIcon } from "@/icons";
import Link from "next/link";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { User2Icon } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary dark:bg-slate-700 dark:text-white text-primary-foreground px-4 py-8 lg:px-6 h-14 flex items-center justify-between">
      <Link href="/" className="flex items-center" prefetch={false}>
        <CodeIcon className="h-6 w-6" />
        <span className="ml-2 font-bold text-lg">CodePal</span>
      </Link>
      <nav className="flex items-center gap-4 sm:gap-6">
        <Link
          href="/"
          className="text-sm font-medium hover:underline underline-offset-4 hidden sm:block"
          prefetch={false}
        >
          Problems
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4 hidden sm:block"
          prefetch={false}
        >
          <User2Icon />
        </Link>
        <ThemeToggleButton />
      </nav>
    </header>
  );
};

export default Header;
