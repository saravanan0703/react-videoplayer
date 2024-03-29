// VideoPlayer.js
import React from 'react';

const VideoPlayer = ({ video }) => {
  return (
    <div className='container mx-auto'>
      <iframe
        className='w-full	'
        title="YouTube Video Player"
        height="315"
        src={video.src}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        autoPlay
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
