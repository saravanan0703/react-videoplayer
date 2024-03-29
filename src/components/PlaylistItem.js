import React, { useState, useEffect } from 'react';

const PlaylistItem = ({ video, onSelect }) => {
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    const generateThumbnail = async () => {
      try {
        const thumbnailData = await captureThumbnail(video.src);
        setThumbnail(thumbnailData);
      } catch (error) {
        console.error('Error generating thumbnail:', error);
      }
    };

    generateThumbnail();
  }, [video]);

  const captureThumbnail = (videoSrc) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.src = videoSrc;
      video.currentTime = 1;
      video.muted = true;
      video.onloadeddata = () => {
        const canvas = document.createElement('canvas');
        // Adjust thumbnail width and height
        const thumbnailWidth = 100; // Adjust as needed
        const thumbnailHeight = (video.videoHeight / video.videoWidth) * thumbnailWidth;
        canvas.width = thumbnailWidth;
        canvas.height = thumbnailHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURI = canvas.toDataURL('image/jpeg');
        resolve(dataURI);
      };
      video.onerror = (error) => {
        console.error('Error loading video:', error);
        resolve(''); // Return empty string if thumbnail generation fails
      };
    });
  };

  return (
    <div onClick={() => onSelect(video)}>
      {/* Display the thumbnail with adjusted width and height */}
      {thumbnail && <img src={thumbnail} alt={video.title} style={{ width: '140px', height: 'auto' }} />}
      <p>{video.title}</p>
    </div>
  );
};

export default PlaylistItem;
