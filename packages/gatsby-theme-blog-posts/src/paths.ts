export const postPath = (postTitle: string): string =>
  `/app/posts/${postTitle.replace(/ /g, "-").toLowerCase()}/`;

export const postsPath = (page = 0): string =>
  `/app/posts${page === 0 ? "" : `/page/${page + 1}`}`;

export const authorPath = (authorName: string, page = 0): string =>
  `/app/author/${authorName.replace(/ /g, "-").toLowerCase()}${
    page === 0 ? "" : `/page/${page + 1}`
  }`;
