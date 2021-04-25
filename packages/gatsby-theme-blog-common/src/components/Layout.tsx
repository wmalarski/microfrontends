import React from "react";

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps): JSX.Element {
  const { children } = props;

  return (
    <div>
      <h1>Header</h1>
      {children}
    </div>
  );
}
