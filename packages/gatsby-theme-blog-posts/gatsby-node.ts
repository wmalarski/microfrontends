import { GatsbyNode } from "gatsby";
import { resolve } from "path";
import { chunk, groupBy } from "./src/utils";

const requestPageSize = 100;
const paginationSize = 10;

interface PostNode {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
  };
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
  const authorPage = resolve(templates, "AuthorTemplate.tsx");

  const postPath = (title: string): string =>
    `app/posts/${title.replace(/ /g, "-").toLowerCase()}/`;
  const pagePath = (page: number): string =>
    `app/posts${page === 0 ? "" : `/page/${page + 1}`}`;
  const authorPagePath = (author: string, page: number): string =>
    `app/author/${author.replace(/ /g, "-").toLowerCase()}${
      page === 0 ? "" : `/page/${page + 1}`
    }`;

  // Post pages
  const postNodes = (await fetchPosts({ graphql, skip: 0 })).map(post => ({
    authorPage: authorPagePath(post.author.name, 0),
    ...post
  }));
  postNodes.forEach(post =>
    createPage({
      path: postPath(post.title),
      component: blogPost,
      context: {
        id: post.id,
        authorPath: post.authorPage
      }
    })
  );

  // Post pagination
  const nodeChunks = chunk(postNodes, paginationSize);
  nodeChunks.forEach((posts, index) =>
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
    })
  );

  // Authors pages
  const authors = groupBy(postNodes, node => node.author.id);
  Object.entries(authors).forEach(([authorId, postsNodes]) => {
    const authorName = postsNodes[0].author.name;
    const authorChunks = chunk(postsNodes, paginationSize);
    Object.entries(authorChunks).forEach((posts, index) =>
      createPage({
        path: authorPagePath(authorName, index),
        component: authorPage,
        context: {
          authorId,
          posts,
          currentPage: index,
          pageSize: paginationSize,
          pageCount: authorChunks.length,
          prevPath: index === 0 ? null : authorPagePath(authorName, index - 1),
          nextPath:
            index === authorChunks.length - 1
              ? null
              : authorPagePath(authorName, index + 1)
        }
      })
    );
  });
};
