const navLinks = [
  { href: "/agents", label: "Agents" },
  { href: "/ailments", label: "Ailments" },
  { href: "/therapies", label: "Therapies" },
  { href: "/appointments", label: "Appointments" },
];

export function Header() {
  return (
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
  );
}
