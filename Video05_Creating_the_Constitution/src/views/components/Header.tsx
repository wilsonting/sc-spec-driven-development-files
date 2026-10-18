const navLinks = [
  { href: "/agents", label: "Agents" },
  { href: "/ailments", label: "Ailments" },
  { href: "/therapies", label: "Therapies" },
  { href: "/appointments", label: "Appointments" },
];

export function Header() {
  return (
    <header class="container">
      <nav aria-label="Main">
        <ul>
          <li>
            <a href="/" class="logo">
              <strong>AgentClinic</strong>
            </a>
          </li>
        </ul>
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
