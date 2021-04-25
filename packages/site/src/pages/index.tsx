import { Link } from "gatsby";
import Layout from "gatsby-theme-blog-common/src/components/Layout";
import React from "react";

export default function Index(): JSX.Element {
  return (
    <Layout>
      <h1>Hello</h1>
      <Link to="/app/posts">Blog</Link>
    </Layout>
  );
}
