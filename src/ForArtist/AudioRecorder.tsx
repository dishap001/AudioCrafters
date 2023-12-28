
import { useRef, useState } from "react";
import { Button, ProgressBar, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AudioRecorder.css";

const AudioRecorder = () => {
  const audioChunk = useRef<Blob[]>([]);
  const [recordings, setRecordings] = useState<string[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [streamRecording, setStreamRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const timerRef = useRef<number | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      // Reset the audioChunk array for a new recording
      audioChunk.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          // save the data
          audioChunk.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunk.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);

        setRecordings((prevRecs) => [audioUrl, ...prevRecs]);

        setRecordingDuration(0);
        clearInterval(timerRef.current!);

        setIsPaused(false);
        setStreamRecording(false);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(); // it will start recording as soon as it allows
      setStreamRecording(true);

      // Update recording duration every second
      timerRef.current = window.setInterval(() => {
        setRecordingDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    try {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
        clearInterval(timerRef.current!);
      }
    } catch (error) {
      console.error("Error stopping microphone:", error);
    }
  };

  const pauseRecording = () => {
    try {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
        clearInterval(timerRef.current!);
      }
    } catch (error) {
      console.error("Error pausing recording:", error);
    }
  };

  const resumeRecording = () => {
    try {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "paused"
      ) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);

        // Resume the existing timer
        timerRef.current = window.setInterval(() => {
          setRecordingDuration((prevDuration) => prevDuration + 1);
        }, 1000);
      }
    } catch (error) {
      console.error("Error resuming recording:", error);
    }
  };

  const deleteRecording = (indexToDelete: number) => {
    setRecordings((prevRecs) =>
      prevRecs.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <div className="AudioRecorder" >
      <div className="audio-recorder-container">
        <h3>Audio Recording Feature</h3>

        <div className="recording-info">
          <p>Recording Time: {recordingDuration} seconds</p>
          <ProgressBar
            now={(recordingDuration / 60) * 100}
            label={`${recordingDuration}s`}
          />
        </div>
        <div className="Button-Actions">
        <Button
          variant="primary"
          onClick={startRecording}
          disabled={streamRecording}
        >
          Start Recording
        </Button>
        <Button
          variant="secondary"
          onClick={pauseRecording}
          disabled={!streamRecording || isPaused}
        >
          Pause Recording
        </Button>
        <Button
          variant="success"
          onClick={resumeRecording}
          disabled={!streamRecording || !isPaused}
        >
          Resume Recording
        </Button>
        <Button
          variant="danger"
          onClick={stopRecording}
          disabled={!streamRecording}
        >
          Stop Recording
        </Button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Recording</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recordings.map((recUrl, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <audio controls src={recUrl} />
                </td>
                <td>
                  <Button variant="primary">
                    <a href={recUrl} download style={{ color: "white" }}>
                      Download
                    </a>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteRecording(index)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AudioRecorder;
