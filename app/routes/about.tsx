import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "About" },
  ];
};

export default function About() {
  return (
    <div className="container">
      <h1>About Page</h1>
    </div>
  );
}
