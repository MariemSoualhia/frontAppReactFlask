import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Container,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(1),
  },
  streamContainer: {
    maxWidth: "80%",
    margin: "auto",
    border: "2px solid #ccc",
    borderRadius: "8px",
    overflow: "auto",
  },
  stream: {
    display: "block",
    width: "100%",
    height: "auto",
  },
}));

const VideoStream = () => {
  const classes = useStyles();
  const [streamUrl, setStreamUrl] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [cameraList] = useState([
    { name: "Camera 1", rtsp: "0" },
    {
      name: "Camera 2",
      rtsp: "rtsp://rtspstream:9f8f7639a88af813b1bbfc507f8d9c63@zephyr.rtsp.stream/moviee",
    },
    {
      name: "Camera 3",
      rtsp: "rtsp://rtspstream:a6ea88c7cfcfd07c6bfa2eba78c5a9cb@zephyr.rtsp.stream/pattern",
    },
  ]);

  const handleVideoStart = (rtspUrl) => {
    console.log(rtspUrl);
    rtspUrl =
      "rtsp://rtspstream:9f8f7639a88af813b1bbfc507f8d9c63@zephyr.rtsp.stream/movie";
    setStreamUrl(`http://localhost:8000/stream?rtsp_url=${String(rtspUrl)}`);
    setIsStreaming(true);
  };

  const handleVideoStop = () => {
    axios
      .post(`http://localhost:8000/stop_stream`)
      .then((response) => {
        console.log(response.data);
        setStreamUrl("");
        setIsStreaming(false);
      })
      .catch((error) => {
        console.error("Error stopping stream:", error);
      });
  };

  return (
    <Container className={classes.root}>
      <h1>Video Stream</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <h2>Live Stream</h2>
          <div className={classes.streamContainer}>
            {streamUrl && (
              <img
                src={streamUrl}
                className={classes.stream}
                alt="Live stream"
              />
            )}
          </div>
          <br />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleVideoStop}
            disabled={!isStreaming}
            className={classes.button}
          >
            Stop Stream
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <h2>Camera Selection</h2>
          <List>
            {cameraList.map((camera) => (
              <ListItem
                key={camera.name}
                button
                onClick={() => handleVideoStart(camera.rtsp)}
              >
                <ListItemText primary={camera.name} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VideoStream;
