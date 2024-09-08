import { getItem } from "@/lib/storage";
import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: getItem("user") || "",
});
