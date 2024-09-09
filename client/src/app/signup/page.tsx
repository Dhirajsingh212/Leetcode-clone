"use client";
import { userState } from "@/atoms";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setItem } from "@/lib/storage";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";
import { BASE_URL } from "../config";

interface SignUp {
  username: string;
  password: string;
}

const Page = () => {
  const [formData, setFormData] = useState<SignUp>({
    username: "",
    password: "",
  });

  const setUserState = useSetRecoilState(userState);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      if (formData.username.length < 1 || formData.password.length < 1) {
        toast.warning("Fields cannot be empty.");
        return;
      }
      const response = await axios.post(
        `${BASE_URL}auth/signup`,
        {
          username: formData.username,
          password: formData.password,
        },
        { withCredentials: true }
      );
      setItem("user", {
        userId: response.data.id,
      });
      setUserState({
        userId: response.data.id,
      });
      toast.success("Signed up.");
      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error("something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-screen w-full">
      <main className="flex items-center justify-center px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 w-full max-w-4xl">
          <div className="bg-background  dark:bg-slate-800 rounded-xl shadow-lg p-8 flex flex-col gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Sign Up</h2>
              <p className="text-muted-foreground">
                Create a new account to get started.
              </p>
            </div>
            <form onSubmit={submitHandler} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Username</Label>
                <Input
                  value={formData.username}
                  onChange={(e) => {
                    setFormData((prev: SignUp) => {
                      return {
                        ...prev,
                        username: e.target.value,
                      };
                    });
                  }}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="dark:bg-slate-950"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData((prev: SignUp) => {
                      return {
                        ...prev,
                        password: e.target.value,
                      };
                    });
                  }}
                  type="password"
                  placeholder="*********"
                  className="dark:bg-slate-950"
                />
              </div>
              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading ? <Spinner /> : "Sign Up"}
              </Button>
            </form>
            <div className="text-center text-sm">
              Already have an account?
              <Link
                href="/signin"
                className="text-primary hover:underline"
                prefetch={false}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
