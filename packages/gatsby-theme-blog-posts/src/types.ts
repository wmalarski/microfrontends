export interface PostNode {
  id: string;
  title: string;
  createdAt: string;
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
