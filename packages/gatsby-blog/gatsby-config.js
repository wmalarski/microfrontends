module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-create-client-paths",
      options: {
        prefixes: [`/app/auth/*`],
      },
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
  ],
};
