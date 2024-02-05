import type { MetaFunction } from "@remix-run/node";
import React from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="container mx-auto flex max-w-4xl flex-col gap-16">
      <div className='animate-in flex flex-col gap-8'>
        <div
          className='animate-in text-primary flex flex-col-reverse gap-6 md:flex-row md:items-center'
          style={{ '--index': 1 } as React.CSSProperties}
        >
          <h1>Home Page</h1>
        </div>
      </div>
    </div>
  );
}
