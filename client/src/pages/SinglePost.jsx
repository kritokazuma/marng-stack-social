import React, { useContext, useRef, useState } from "react";
import { Card, Grid, Image, Dimmer, Loader, Form } from "semantic-ui-react";
import { CREATE_COMMENT, SINGLE_POST } from "../Queries";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import CommentButton from "../components/CommentButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";

export default function SinglePost(props) {
  const { user } = useContext(AuthContext);

  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null);

  const postId = props.match.params.postId;

  const [submitComment] = useMutation(CREATE_COMMENT, {
    variables: { postId, body: comment },
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
  });

  const { data, loading, error } = useQuery(SINGLE_POST, {
    variables: { postId },
  });

  if (loading) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  }
  const {
    username,
    id,
    body,
    createdAt,
    comments,
    likes,
    commentCount,
    likeCount,
  } = data.getPost;

  const getDate = parseInt(createdAt);

  const deletePostCb = () => {
    props.history.push("/");
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            floated="left"
            size="small"
            src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(getDate).fromNow()}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
              <LikeButton post={{ id, likeCount, likes }} />
              <CommentButton commentCount={commentCount} />
              {user && user.username === username && (
                <DeleteButton id={id} callback={deletePostCb} />
              )}
            </Card.Content>
          </Card>
          {user && (
            <Card fluid>
              <Card.Content>
                <p>Post a comment</p>
                <Form>
                  <div className="ui action input fluid">
                    <input
                      type="text"
                      placeholder="Comment..."
                      name="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      ref={commentInputRef}
                    />
                    <button
                      type="submit"
                      className="ui button teal"
                      disabled={comment.trim() === ""}
                      onClick={submitComment}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </Card.Content>
            </Card>
          )}
          {comments.map((comment) => (
            <Card fluid key={comment.id}>
              <Card.Content>
                {user && user.username === comment.username && (
                  <DeleteButton id={id} commentId={comment.id} />
                )}
                <Card.Header>{comment.username}</Card.Header>
                <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{comment.body}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
