// App.js
import './App.css';
import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import Playlist from './components/Playlist';
import video1 from './videos/video1.mp4'
import video2 from './videos/video2.mp4'
import video3 from './videos/video3.mp4'
import video4 from './videos/video4.mp4'
import Test from './components/Testing';

function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    { title: 'Video 1', src: video1 },
    { title: 'Video 2', src: video2 },
    { title: 'Video 3', src: video3 },
    { title: 'Video 4', src: video4 },
    // Add more video objects as needed
  ];

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="App">
      {selectedVideo && <VideoPlayer video={selectedVideo} />}
      <Playlist videos={videos} onVideoSelect={handleVideoSelect} />
    </div>
  );
}

export default App;
