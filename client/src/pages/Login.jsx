import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../Queries";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";

export default function Login(props) {
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);

  const { handleChange, handleSubmit, credentials } = useForm(loginCallback, {
    username: "",
    password: "",
  });

  const [login, { loading }] = useMutation(LOGIN, {
    variables: credentials,
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError: (err) => {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  function loginCallback() {
    login();
  }

  return (
    <div className="form-container">
      <Form
        className={loading ? "loading" : ""}
        style={{ width: "500px", margin: "20px auto" }}
        onSubmit={handleSubmit}
      >
        <h1>Login</h1>
        <Form.Field>
          <label>Username</label>
          <Form.Input
            placeholder="Username"
            value={credentials.username}
            name="username"
            error={errors.username ? true : false}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Form.Input
            placeholder="Password"
            type="password"
            value={credentials.password}
            name="password"
            error={errors.password ? true : false}
            onChange={handleChange}
          />
        </Form.Field>
        <Button type="submit" color="blue">
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
