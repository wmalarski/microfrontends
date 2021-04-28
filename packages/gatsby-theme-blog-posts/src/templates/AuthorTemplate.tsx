import { graphql, PageProps } from "gatsby";
import Layout from "gatsby-theme-blog-common/src/components/Layout";
import React from "react";
import AuthorCard from "../components/AuthorCard";
import PostList from "../components/PostList";
import { ContentfulAuthor, PageInfoContext, PostNode } from "../types";

export interface AuthorTemplateData {
  author: ContentfulAuthor;
}

export interface AuthorTemplateContext {
  posts: PostNode[];
  pageInfo: PageInfoContext;
}

export default function AuthorTemplate(
  props: PageProps<AuthorTemplateData, AuthorTemplateContext>
): JSX.Element {
  const { pageContext, data } = props;
  const { posts, pageInfo } = pageContext;
  const { author } = data;

  return (
    <Layout>
      <AuthorCard author={author} />
      <PostList posts={posts} pageInfo={pageInfo} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query Author($id: String!) {
    author: contentfulAuthor(id: { eq: $id }) {
      id
      name
      createdAt
      biography {
        raw
      }
    }
  }
`;
