"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { RecoilRoot } from "recoil";

export function ThemeProviders({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <RecoilRoot>{children}</RecoilRoot>
    </NextThemesProvider>
  );
}
