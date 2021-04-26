/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(
    "../gatsby-theme-blog-posts/src/templates/PostTemplate.tsx"
  );

  const result = await graphql(`
    query MyQuery {
      allContentfulPost {
        nodes {
          id
          title
        }
      }
    }
  `);

  result.data.allContentfulPost.nodes.forEach(post => {
    const title = post.title.replace(/ /g, "-").toLowerCase();
    createPage({
      path: `app/posts/${title}/`,
      component: blogPost,
      context: {
        id: post.id
      }
    });
  });
};
