export interface PostNode {
  id: string;
  title: string;
  createdAt: string;
  summary: {
    text: string;
  };
  author: {
    id: string;
    name: string;
  };
}

export interface PageInfoContext {
  currentPage: number;
  pageSize: number;
  pageCount: number;
  prevPath: string | null;
  nextPath: string | null;
}

export interface ContentfulAuthor {
  id: string;
  name: string;
  createdAt: string;
  biography: {
    raw: string;
  };
}

export interface ContentfulPost {
  id: string;
  createdAt: string;
  title: string;
  updatedAt: string;
  author: ContentfulAuthor;
  text: {
    raw: string;
  };
}
