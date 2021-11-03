import e from "cors";
import React, { useState } from "react";

export const useForm = (cb, initialState = {}) => {
  const [credentials, setCredentials] = useState(initialState);

  const handleChange = ({ target }) => {
    setCredentials({ ...credentials, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCredentials(initialState);
    cb();
  };

  return {
    handleChange,
    handleSubmit,
    credentials,
  };
};
