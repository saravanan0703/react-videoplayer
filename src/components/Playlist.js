import React, { useState, useEffect } from 'react';

const Playlist = ({ videos, onVideoSelect }) => {
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    const generateThumbnails = async () => {
      try {
        const thumbnailList = await Promise.all(
          videos.map(async (video) => {
            const thumbnail = await captureThumbnail(video.src);
            return thumbnail;
          })
        );
        setThumbnails(thumbnailList);
      } catch (error) {
        console.error('Error generating thumbnails:', error);
      }
    };

    generateThumbnails();
  }, [videos]);

  const captureThumbnail = (videoSrc) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.src = videoSrc;
      video.currentTime = 1;
      video.muted = true;
      video.onloadeddata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
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
    <div>
      <h2>Playlist</h2>
      <div className="preview-list">
        {thumbnails.map((thumbnail, index) => (
          <div
            key={index}
            onClick={() => onVideoSelect(videos[index])}
            className="preview-item"
          >
            <img src={thumbnail} alt={`Thumbnail ${index}`} />
            <p>{videos[index].title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
