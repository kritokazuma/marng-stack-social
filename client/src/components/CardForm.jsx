import React, { useContext } from "react";
import { Card, Image, Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "./DeleteButton";

export default function CardForm({
  post: { username, id, body, createdAt, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);

  const getDate = parseInt(createdAt);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
        />
        <Card.Header as={Link} to={`/users/${id}`}>
          {username}
        </Card.Header>
        <Card.Meta>{moment(new Date(getDate)).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content>
        <LikeButton post={{ id, likes, likeCount }} />
        <CommentButton commentCount={commentCount} />
        {user && user.username === username && <DeleteButton id={id} />}
      </Card.Content>
    </Card>
  );
}
