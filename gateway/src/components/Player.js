import React, { useState, useEffect } from "react";
import * as Player from "@livepeer/react/player";
import { PlayIcon, PauseIcon } from "@livepeer/react/assets";
import { getSrc } from "@livepeer/react/external";
import { Livepeer } from "livepeer";

const PLAYBACK_ID = "8b3bdqjtdj4jsjwa";

console.log(process.env);

const livepeer = new Livepeer({
	apiKey: process.env.REACT_APP_LIVEPEER_STUDIO_API_KEY,
});

export const getPlaybackSource = async (playbackId = PLAYBACK_ID) => {
	const playbackInfo = await livepeer.playback.get(playbackId);
	const src = getSrc(playbackInfo.playbackInfo);

	return src;
};

export const VideoPlayer = (props) => {
	const [src, setSrc] = useState(null);

	useEffect(() => {
		const fetchSrc = async () => {
			const fetchedSrc = await getPlaybackSource();
			setSrc(fetchedSrc);
		};
		fetchSrc();
	}, []);

	if (!src) {
		return <p>Loading</p>;
	}

	return (
		<Player.Root src={src}>
			<Player.Container>
				<Player.Video title="Live stream" />
				<Player.Controls className="flex items-center justify-center">
					<Player.PlayPauseTrigger className="w-10 h-10">
						<Player.PlayingIndicator asChild matcher={false}>
							<PlayIcon />
						</Player.PlayingIndicator>
						<Player.PlayingIndicator asChild>
							<PauseIcon />
						</Player.PlayingIndicator>
					</Player.PlayPauseTrigger>
				</Player.Controls>
			</Player.Container>
		</Player.Root>
	);
};
