import { GatsbyNode } from "gatsby";
import { resolve } from "path";
import { chunk } from "./src/utils";

const requestPageSize = 100;
const paginationSize = 10;

interface PostNode {
  id: string;
  title: string;
}

async function fetchPosts({ graphql, skip }): Promise<PostNode[]> {
  const result = await graphql(
    `
      query MyQuery($limit: Int, $skip: Int) {
        allContentfulPost(limit: $limit, skip: $skip) {
          pageInfo {
            hasNextPage
          }
          nodes {
            id
            title
            createdAt
            author {
              id
              name
            }
          }
        }
      }
    `,
    {
      limit: requestPageSize,
      skip
    }
  );

  const posts = result.data.allContentfulPost;
  if (!posts.pageInfo.hasNextPage) {
    return posts.nodes;
  }

  const nextResult = await fetchPosts({
    graphql,
    skip: skip + requestPageSize
  });
  return [...posts.nodes, ...nextResult];
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions
}) => {
  const { createPage } = actions;

  const templates = "../gatsby-theme-blog-posts/src/templates";
  const blogPost = resolve(templates, "PostTemplate.tsx");
  const blogPage = resolve(templates, "PostsTemplate.tsx");

  const postNodes = await fetchPosts({ graphql, skip: 0 });

  postNodes.forEach(post => {
    const title = post.title.replace(/ /g, "-").toLowerCase();
    createPage({
      path: `app/posts/${title}/`,
      component: blogPost,
      context: {
        id: post.id
      }
    });
  });

  const pagePath = (page: number): string => `app/posts/page/${page + 1}`;
  const nodeChunks = chunk(postNodes, paginationSize);

  nodeChunks.forEach((posts, index) => {
    createPage({
      path: pagePath(index),
      component: blogPage,
      context: {
        posts,
        currentPage: index,
        pageSize: paginationSize,
        pageCount: nodeChunks.length,
        prevPath: index === 0 ? null : pagePath(index - 1),
        nextPath: index === nodeChunks.length - 1 ? null : pagePath(index + 1)
      }
    });
  });
};
