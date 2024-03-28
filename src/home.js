import React from "react";
import VideoPlayer from "./VideoPlayer";
import axios from "axios";

function home() {
  const [stream, setStream] = React.useState(null);

  React.useEffect(() => {
    const fetchVideoStream = async () => {
      try {
        const response = await axios.get("http://localhost:5000/video_feed", {
          responseType: "arraybuffer",
        });

        const blob = new Blob([response.data], { type: "image/jpeg" });
        const url = URL.createObjectURL(blob);

        setStream(url);
      } catch (error) {
        console.error("Error fetching video stream:", error);
      }
    };

    fetchVideoStream();

    return () => {
      // Cleanup code if needed
    };
  }, []);

  React.useEffect(() => {
    const getVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        console.log("Stream:", stream);
      } catch (error) {
        console.error("Error accessing user media:", error);
      }
    };

    getVideoStream();
  }, []);

  return (
    <div className="App">
      <h1>Live Video Stream</h1>

      {stream && <VideoPlayer src={stream} />}
    </div>
  );
}

export default home;
