import { graphql, PageProps } from "gatsby";
import Layout from "gatsby-theme-blog-common/src/components/Layout";
import React from "react";

export default function PostTemplate(props: PageProps): JSX.Element {
  return (
    <Layout>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    post: contentfulPost(id: { eq: $id }) {
      createdAt
      id
      title
      updatedAt
      author {
        id
        name
        biography {
          raw
        }
      }
      text {
        raw
      }
    }
  }
`;
