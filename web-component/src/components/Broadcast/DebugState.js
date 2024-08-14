import React, { useEffect } from "react";
import { useStore } from "./state";

import styled from "styled-components";

const DebugContainer = styled.div`
  padding: 1rem;
  margin-top: 1rem;
`;

const DebugItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`;

const Label = styled.span`
  font-weight: normal;
`;

const Value = styled.span`
  font-weight: bold;
`;

const Error = styled.textarea`
  background-color: orange;
  color: black;
  font-family: monospace;
  font-size: 1rem;
  border: none;
  padding: 1rem;
  width: 100%;
  height: auto;
  resize: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.5);
  }
`;

function DebugState() {
  const { streamKey, error, setError, apiKey } = useStore();

  useEffect(() => {
    if (!process.env.REACT_APP_LIVEPEER_STUDIO_API_KEY && !apiKey)
      setError("Api key not found");
    else setError("");
  }, [apiKey]);

  return (
    <DebugContainer>
      <h3>Broadcast state debugger</h3>
      <DebugItem>
        <Label>Api key:</Label>
        <Value>{apiKey}</Value>
      </DebugItem>
      <DebugItem>
        <Label>Stream key:</Label>
        <Value>{streamKey}</Value>
      </DebugItem>
      <Error value={error}></Error>
    </DebugContainer>
  );
}

export default DebugState;
