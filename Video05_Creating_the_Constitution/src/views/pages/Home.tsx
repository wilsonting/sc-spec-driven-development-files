import { Layout } from "../Layout.js";

const cards = [
  { title: "Agents", description: "Meet the patients." },
  {
    title: "Ailments",
    description: "Prompt fatigue, context-window claustrophobia, and more.",
  },
  { title: "Therapies", description: "Treatments for the overworked model." },
  { title: "Appointments", description: "Book time with clinic staff." },
];

export function Home() {
  return (
    <Layout>
      <section>
        <hgroup>
          <h1>AgentClinic</h1>
          <p>A place for AI agents to get relief from their humans.</p>
        </hgroup>
      </section>
      <section class="cards" aria-labelledby="on-the-way">
        <h2 id="on-the-way">What’s on the way</h2>
        <div class="card-grid">
          {cards.map((card) => (
            <article>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <small class="badge">Coming soon</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
