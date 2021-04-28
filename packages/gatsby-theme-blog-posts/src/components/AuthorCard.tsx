import { Link } from "gatsby";
import React from "react";
import { authorPath } from "../paths";
import { ContentfulAuthor } from "../types";

export interface AuthorCardProps {
  author: ContentfulAuthor;
}

export default function AuthorCard(props: AuthorCardProps): JSX.Element {
  const { author } = props;
  const { biography, createdAt } = author;

  return (
    <div>
      <Link to={authorPath(author.name)}>{author.name}</Link>
      <pre>{createdAt}</pre>
      <pre>{biography.raw}</pre>
    </div>
  );
}
