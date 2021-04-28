import { Link } from "gatsby";
import React from "react";
import { PageInfoContext, PostNode } from "../types";
import PostListItem from "./PostListItem";

export interface PostListProps {
  posts: PostNode[];
  pageInfo: PageInfoContext;
}

export default function PostList(props: PostListProps): JSX.Element {
  const { posts, pageInfo } = props;
  const { currentPage, nextPath, prevPath } = pageInfo;
  return (
    <>
      <div style={{ display: "block" }}>
        {posts.map(post => (
          <PostListItem key={post.id} post={post} />
        ))}
      </div>
      <div>
        {prevPath && <Link to={prevPath}>{currentPage}</Link>}
        <span>{currentPage + 1}</span>
        {nextPath && <Link to={nextPath}>{currentPage + 2}</Link>}
      </div>
    </>
  );
}
