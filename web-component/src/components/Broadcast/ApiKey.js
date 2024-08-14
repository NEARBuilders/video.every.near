import React, { useEffect, useState } from "react";

import { useStore } from "./state";

import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid #23242b;
  border-radius: 8px;
  background-color: #2c2c2c;
  color: #a5a5a5;

  label {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  input {
    padding: 12px;
    border: 1px solid #444;
    border-radius: 4px;
    background-color: #1c1c1c;
    color: #a5a5a5;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: #666;
    }
  }

  button {
    padding: 12px 16px;
    border: none;
    border-radius: 4px;
    background-color: #000;
    color: #a5a5a5;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    width: 300px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #1c1a1a;
    }
  }
`;

const ApiKey = (props) => {
  const { apiKey, setApiKey } = useStore();

  const [apiKeyValue, setApiKeyValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setApiKey(apiKeyValue);
  };

  useEffect(() => {
    if (!apiKey) setApiKey(props.apiKey);
  }, [props.apiKey]);

  if (props.automated) {
    return <></>;
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <label>
        Api key:
        <input
          type="text"
          value={apiKeyValue}
          onChange={(event) => setApiKeyValue(event.target.value)}
        />
      </label>
      <button type="submit">Set api key</button>
    </FormContainer>
  );
};

export default ApiKey;
