import { Layout } from "../Layout.js";

export function NotFound() {
  return (
    <Layout title="Not found">
      <h1>Page not found</h1>
      <p>We couldn't find that page. It may not be open yet.</p>
      <p>
        <a href="/">Back to the home page</a>
      </p>
    </Layout>
  );
}
