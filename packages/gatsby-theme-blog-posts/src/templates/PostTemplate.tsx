import { graphql, PageProps } from "gatsby";
import Layout from "gatsby-theme-blog-common/src/components/Layout";
import React from "react";
import AuthorCard from "../components/AuthorCard";
import { ContentfulPost } from "../types";

export interface PostTemplateData {
  post: ContentfulPost;
}

export default function PostTemplate(
  props: PageProps<PostTemplateData>
): JSX.Element {
  const { data } = props;
  const { post } = data;
  const { author, text, title, updatedAt } = post;

  return (
    <Layout>
      <pre>{title}</pre>
      <pre>{updatedAt}</pre>
      <pre>{text.raw}</pre>
      <AuthorCard author={author} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query Post($id: String!) {
    post: contentfulPost(id: { eq: $id }) {
      createdAt
      id
      title
      updatedAt
      author {
        id
        name
        createdAt
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
