import { Link } from "gatsby";
import Layout from "gatsby-theme-blog-common/src/components/Layout";
import React from "react";

export default function Blog(): JSX.Element {
  return (
    <Layout>
      <h2>Blog</h2>
      <Link to="/app/posts/post">Post</Link>
    </Layout>
  );
}
