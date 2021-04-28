import { PageProps } from "gatsby";
import Layout from "gatsby-theme-blog-common/src/components/Layout";
import React from "react";

export default function PostsTemplate(props: PageProps): JSX.Element {
  return (
    <Layout>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </Layout>
  );
}
