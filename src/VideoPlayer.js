import React, { useState } from "react";

function VideoPlayer() {
  const [videoError, setVideoError] = useState(false);

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {videoError ? (
          <div>Une erreur s'est produite lors du chargement de la vidéo.</div>
        ) : (
          <video
            src="http://localhost:8000/stream"
            className="App-video"
            alt="video"
            controls
            onError={handleVideoError}
          />
        )}
      </header>
    </div>
  );
}

export default VideoPlayer;
