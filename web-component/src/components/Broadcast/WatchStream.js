import React from "react";
import styled from "styled-components";

import { useStore } from "../Broadcast/state";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #2d2d2d;
  padding: 2rem;
  border-radius: 16px;
  color: #a5a5a5;
`;

const IframeContainer = styled.div`
  margin-top: 16px;
`;

const WatchStream = ({ pId }) => {
  const { playbackId } = useStore();

  const currentPlaybackId = pId || playbackId;

  return (
    <Container>
      {currentPlaybackId && (
        <IframeContainer>
          <iframe
            src={`https://lvpr.tv?v=${currentPlaybackId}`}
            frameborder="0"
            allowfullscreen
            allow="autoplay; encrypted-media; picture-in-picture"
            sandbox="allow-same-origin allow-scripts"
          ></iframe>
        </IframeContainer>
      )}
    </Container>
  );
};

export default WatchStream;
