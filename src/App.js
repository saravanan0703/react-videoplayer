import './App.css';
import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import PlaylistItem from './components/PlaylistItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import video1 from './videos/video1.mp4';
import video2 from './videos/video2.mp4';
import video3 from './videos/video3.mp4';
import video4 from './videos/video4.mp4';

function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([
    { id: 'video-1', title: 'Video 1', src: video1 },
    { id: 'video-2', title: 'Video 2', src: video2 },
    { id: 'video-3', title: 'Video 3', src: video3 },
    { id: 'video-4', title: 'Video 4', src: video4 },
  ]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleVideoReorder = (result) => {
    if (!result.destination) return;

    const newVideos = Array.from(videos);
    const [removed] = newVideos.splice(result.source.index, 1);
    newVideos.splice(result.destination.index, 0, removed);

    setVideos(newVideos);
  };

  return (
    <div className="App">
      {selectedVideo && <VideoPlayer video={selectedVideo} />}
      <DragDropContext onDragEnd={handleVideoReorder}>
        <Droppable droppableId="playlist" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: 'flex' }}
            >
              {videos.map((video, index) => (
                <Draggable key={video.id} draggableId={video.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <PlaylistItem video={video} onSelect={handleVideoSelect} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}



export default App;
