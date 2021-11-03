import React, { useContext } from "react";
import { Card, Grid, Dimmer, Loader, Transition } from "semantic-ui-react";
import { FETCH_ALL_POST } from "../Queries";
import { useQuery } from "@apollo/client";
import CardForm from "../components/CardForm";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";

export default function Home() {
  const { loading, data, error } = useQuery(FETCH_ALL_POST);
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          {loading ? (
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          ) : (
            <Transition.Group animation='slide down'>
              {data.getPosts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                <CardForm post={post} />
              </Grid.Column>
              ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
}
