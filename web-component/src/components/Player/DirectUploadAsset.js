import React, { useState } from "react";
import { useStore } from "./state";
import styled from "styled-components";
const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #a5a5a5;
  padding: 16px;
  border-radius: 8px;
  background-color: #2c2c2c;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: #2c2c2c;
  color: #a5a5a5;
`;

const UploadLabel = styled.label`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const UploadInput = styled.input`
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
`;

const UploadButton = styled.button`
  padding: 12px 24px;
  margin-top: 10px;
  border-radius: 4px;
  background-color: #000;
  border: 1px solid #23242b;
  color: #a5a5a5;
  font-size: 14px;
  width: 300px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1c1a1a;
  }

  &:disabled {
    background-color: #444;
    cursor: not-allowed;
  }
`;
function DirectUploadAsset() {
  const { uploadUrl, setError } = useStore();

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    // event.preventDefault();

    if (!file) {
      setError("Please select a file first!");
      return;
    }

    try {
      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": "video/mp4",
        },
      });

      if (response.ok) {
        alert("Upload successful");
      } else {
        setError("Upload failed");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <FormContainer>
      <UploadContainer>
        <UploadLabel>
          Upload file:
          <UploadInput type="file" onChange={handleFileChange} />
          <UploadButton type="submit" onClick={handleSubmit}>
            Upload
          </UploadButton>
        </UploadLabel>
      </UploadContainer>
    </FormContainer>
  );
}

export default DirectUploadAsset;
