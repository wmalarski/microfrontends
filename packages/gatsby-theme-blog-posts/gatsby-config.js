/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
  debug: true
});

module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      }
    }
  ]
};
