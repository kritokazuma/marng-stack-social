import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../Queries";
import { AuthContext } from "../context/auth";

export default function Register(props) {
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);

  const { handleChange, handleSubmit, credentials } = useForm(
    registerCallback,
    {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  );
  const [register, { loading }] = useMutation(REGISTER, {
    variables: credentials,
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  function registerCallback() {
    register();
  }

  return (
    <div className="form-container">
      <Form
        className={loading ? "loading" : ""}
        style={{ width: "500px", margin: "20px auto" }}
        onSubmit={handleSubmit}
      >
        <h1>Register</h1>
        <Form.Field>
          <label>Username</label>
          <Form.Input
            placeholder="username"
            name="username"
            value={credentials.username}
            error={errors.username ? true : false}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <Form.Input
            placeholder="Email"
            name="email"
            value={credentials.email}
            error={errors.email ? true : false}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Form.Input
            placeholder="Password"
            type="password"
            name="password"
            value={credentials.password}
            error={errors.password ? true : false}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <Form.Input
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleChange}
          />
        </Form.Field>
        <Button type="submit" color="blue">
          Register
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
