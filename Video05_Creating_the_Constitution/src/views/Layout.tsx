import { raw } from "hono/html";
import type { Child } from "hono/jsx";
import { Footer } from "./components/Footer.js";
import { Header } from "./components/Header.js";
import { Main } from "./components/Main.js";

type LayoutProps = {
  title?: string;
  children: Child;
};

export function Layout({ title, children }: LayoutProps) {
  return (
    <>
      {raw("<!DOCTYPE html>")}
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title ? `${title} · AgentClinic` : "AgentClinic"}</title>
          <link rel="icon" href="data:," />
          <link rel="stylesheet" href="/pico.min.css" />
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </body>
      </html>
    </>
  );
}
