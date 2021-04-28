import { GatsbyNode } from "gatsby";
import { resolve } from "path";
import { authorPath, postPath, postsPath } from "./src/paths";
import { PostNode } from "./src/types";
import { chunk, groupBy } from "./src/utils";

const requestPageSize = 100;
const paginationSize = 10;

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
  const authorPage = resolve(templates, "AuthorTemplate.tsx");

  // Post pages
  const postNodes = await fetchPosts({ graphql, skip: 0 });
  postNodes.forEach(post =>
    createPage({
      path: postPath(post.title).slice(1),
      component: blogPost,
      context: { id: post.id }
    })
  );

  // Post pagination
  const nodeChunks = chunk(postNodes, paginationSize);
  nodeChunks.forEach((posts, index) =>
    createPage({
      path: postsPath(index).slice(1),
      component: blogPage,
      context: {
        posts,
        pageInfo: {
          currentPage: index,
          pageSize: paginationSize,
          pageCount: nodeChunks.length,
          prevPath: index === 0 ? null : postsPath(index - 1),
          nextPath:
            index === nodeChunks.length - 1 ? null : postsPath(index + 1)
        }
      }
    })
  );

  // Authors pages
  const authors = groupBy(postNodes, node => node.author.id);
  Object.entries(authors).forEach(([authorId, postsNodes]) => {
    const authorName = postsNodes[0].author.name;
    const authorChunks = chunk(postsNodes, paginationSize);
    authorChunks.forEach((posts, index) =>
      createPage({
        path: authorPath(authorName, index).slice(1),
        component: authorPage,
        context: {
          id: authorId,
          posts,
          pageInfo: {
            currentPage: index,
            pageSize: paginationSize,
            pageCount: authorChunks.length,
            prevPath: index === 0 ? null : authorPath(authorName, index - 1),
            nextPath:
              index === authorChunks.length - 1
                ? null
                : authorPath(authorName, index + 1)
          }
        }
      })
    );
  });
};
