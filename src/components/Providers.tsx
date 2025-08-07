import React, { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Theme } from "@radix-ui/themes";

interface IProviders {
  children: ReactNode;
}

export const Providers = ({ children }: IProviders) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Theme accentColor="sky">{children}</Theme>
      </ThemeProvider>
    </>
  );
};
