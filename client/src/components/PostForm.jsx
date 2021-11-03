import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { useForm } from "../utils/hooks";
import { CREATE_POST, FETCH_ALL_POST } from "../Queries";
import { AuthContext } from "../context/auth";

export default function PostForm() {
  const { handleChange, handleSubmit, credentials } = useForm(
    submitPostCallback,
    {
      body: "",
    }
  );

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    variables: credentials,
    refetchQueries: [{ query: FETCH_ALL_POST }],
  });

  function submitPostCallback() {
    createPost();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <Form.Input
          placeholder="Create a post"
          name="body"
          value={credentials.body}
          onChange={handleChange}
        />
        <Button
          type="submit"
          color="teal"
        >
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
}
