import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Links" },
  ];
};

export default function Links() {
  return <h1>Links Page</h1>;
}
