import { graphql, PageProps } from "gatsby";
import Layout from "gatsby-theme-blog-common/src/components/Layout";
import React from "react";
import PostList from "../components/PostList";
import { PageInfoContext, PostNode } from "../types";

export interface AuthorTemplateContext {
  posts: PostNode[];
  pageInfo: PageInfoContext;
}

export default function AuthorTemplate(
  props: PageProps<Record<string, never>, AuthorTemplateContext>
): JSX.Element {
  const { pageContext } = props;
  const { posts, pageInfo } = pageContext;

  return (
    <Layout>
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <PostList posts={posts} pageInfo={pageInfo} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query Author($id: String!) {
    author: contentfulAuthor(id: { eq: $id }) {
      id
      name
      biography {
        raw
      }
      createdAt
    }
  }
`;
