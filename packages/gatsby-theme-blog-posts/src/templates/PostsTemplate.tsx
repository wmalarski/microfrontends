import { PageProps } from "gatsby";
import Layout from "gatsby-theme-blog-common/src/components/Layout";
import React from "react";
import PostList from "../components/PostList";
import { PageInfoContext, PostNode } from "../types";

export interface PostsTemplateContext {
  posts: PostNode[];
  pageInfo: PageInfoContext;
}

export default function PostsTemplate(
  props: PageProps<Record<string, never>, PostsTemplateContext>
): JSX.Element {
  const { pageContext } = props;
  const { posts, pageInfo } = pageContext;

  return (
    <Layout>
      <PostList posts={posts} pageInfo={pageInfo} />
    </Layout>
  );
}
