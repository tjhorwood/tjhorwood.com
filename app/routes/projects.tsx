import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Projects" },
  ];
};

export default function Projects() {
  return <h1>Projects Page</h1>;
}
