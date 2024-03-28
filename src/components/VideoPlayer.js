// VideoPlayer.js
import React from 'react';

const VideoPlayer = ({ video }) => {
  return (
    <div>
      <iframe
        title="YouTube Video Player"
        width="560"
        height="315"
        src={video.src}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
