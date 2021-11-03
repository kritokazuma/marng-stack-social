import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT, DELETE_POST, FETCH_ALL_POST } from "../Queries";

export default function DeleteButton({ id, commentId, callback }) {
  const [confrimOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT : DELETE_POST
  const [deletePostOrComment] = useMutation(mutation, {
    variables: { postId: id, commentId },
    refetchQueries: [{ query: FETCH_ALL_POST }],
    update(proxy, _) {
      setConfirmOpen(false);
      if (callback) {
        callback();
      }
    },
  });

  return (
    <>
      <Button
        basic
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confrimOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      ></Confirm>
    </>
  );
}
