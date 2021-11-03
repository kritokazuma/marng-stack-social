import React from "react";
import { Button, Label, Icon } from "semantic-ui-react";

export default function CommentButton({ commentCount }) {
  return (
    <Button as="div" labelPosition="right">
      <Button basic color="blue">
        <Icon name="comment" />
      </Button>
      <Label as="a" basic color="blue" pointing="left">
        {commentCount}
      </Label>
    </Button>
  );
}
