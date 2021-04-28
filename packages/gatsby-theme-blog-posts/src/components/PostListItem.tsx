import { Link } from "gatsby";
import React from "react";
import { authorPath, postPath } from "../paths";
import { PostNode } from "../types";

export interface PostListItemProps {
  post: PostNode;
}

export default function PostListItem(props: PostListItemProps): JSX.Element {
  const { post } = props;
  const { author, title, createdAt } = post;

  return (
    <div>
      <Link to={postPath(title)}>{title}</Link>
      <Link to={authorPath(author.name)}>{author.name}</Link>
      <p>{createdAt}</p>
    </div>
  );
}
