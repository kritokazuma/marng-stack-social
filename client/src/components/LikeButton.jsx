import React from "react";
import { Button, Label, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { LIKE_POST } from "../Queries";

export default function LikeButton({ post: { id, likes, likeCount } }) {
  const [likePost, { loading }] = useMutation(LIKE_POST, {
    variables: { postId: id },
  });
  return (
    <Button as="div" labelPosition="right">
      <Button
        color="teal"
        onClick={likePost}
        className={loading ? "loading" : ""}
      >
        <Icon name={"heart"} />
      </Button>
      <Label as="a" basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}
