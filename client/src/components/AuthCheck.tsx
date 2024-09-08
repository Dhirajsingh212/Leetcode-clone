"use client";
import { getItem } from "@/lib/storage";
import { redirect } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Spinner from "./Spinner";

const AuthCheck = ({ children }: { children: ReactNode }) => {
  const userStateValue = getItem("user");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-row justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!userStateValue || !userStateValue.userId) {
    redirect("/signin");
    return null;
  }

  return <>{children}</>;
};

export default AuthCheck;
