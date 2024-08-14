import React, { useState } from "react";
import * as tus from "tus-js-client";

import { useStore } from "./state";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #2d2d2d;
  padding: 2rem;
  border-radius: 16px;
  color: #a5a5a5;
`;

const Input = styled.input`
  padding: 12px;

  border-radius: 4px;
  background-color: #1c1c1c;
  color: #a5a5a5;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: #444;
  border-radius: 4px;
  overflow: hidden;
  height: 24px;
  margin-top: 8px;
`;

const Progress = styled.div`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background-color: #4caf50;
  transition: width 0.2s ease;
`;

const StatusText = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: #a5a5a5;
`;
const ResumableUploadAsset = () => {
  const { resumableUploadUrl } = useStore();

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadUrl, setUploadUrl] = useState("");

  const handleFilesChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const upload = new tus.Upload(file, {
      endpoint: resumableUploadUrl,
      retryDelays: [0, 1000, 3000, 5000],
      metadata: {
        filename: file.name,
        filetype: file.type,
      },
      uploadSize: file.size,
      onError: (err) => {
        setError("Error uploading file: " + err.message);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        setUploadProgress(percentage);
      },
      onSuccess: () => {
        setUploadUrl(upload.url);
      },
    });

    const previousUploads = await upload.findPreviousUploads();
    if (previousUploads.length > 0) {
      upload.resumeFromPreviousUpload(previousUploads[0]);
    }

    upload.start();
  };

  return (
    // <div>
    //   <input type="file" onChange={handleFilesChange} accept="video/*" />
    //   <div>
    //     {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
    //     {uploadUrl && <p>Upload finished! URL: {uploadUrl}</p>}
    //   </div>
    // </div>
    <Container>
      <Input type="file" onChange={handleFilesChange} accept="video/*" />
      {uploadProgress > 0 && (
        <ProgressBar>
          <Progress percentage={uploadProgress} />
        </ProgressBar>
      )}
      {uploadProgress > 0 && (
        <StatusText>Upload Progress: {uploadProgress}%</StatusText>
      )}
      {uploadUrl && <StatusText>Upload finished! URL: {uploadUrl}</StatusText>}
    </Container>
  );
};

export default ResumableUploadAsset;
