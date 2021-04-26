import { graphql } from "gatsby";
import Layout from "gatsby-theme-blog-common/src/components/Layout";
import React from "react";

export default function PostTemplate(props: any): JSX.Element {
  console.log("PostTemplate", props);

  return (
    <Layout>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    contentfulPost(id: { eq: $id }) {
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
