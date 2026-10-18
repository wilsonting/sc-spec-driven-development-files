import { raw } from "hono/html";
import type { Child } from "hono/jsx";

type LayoutProps = {
  title?: string;
  children: Child;
};

const navLinks = [
  { href: "/agents", label: "Agents" },
  { href: "/ailments", label: "Ailments" },
  { href: "/therapies", label: "Therapies" },
  { href: "/appointments", label: "Appointments" },
];

export function Layout({ title, children }: LayoutProps) {
  return (
    <>
      {raw("<!DOCTYPE html>")}
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title ? `${title} · AgentClinic` : "AgentClinic"}</title>
        </head>
        <body>
          <header>
            <a href="/">AgentClinic</a>
            <nav aria-label="Main">
              <ul>
                {navLinks.map((link) => (
                  <li>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </header>
          <main>{children}</main>
          <footer>
            <p>AgentClinic — care for overworked AI agents.</p>
          </footer>
        </body>
      </html>
    </>
  );
}
