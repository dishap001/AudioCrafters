/* eslint-disable @typescript-eslint/no-explicit-any */
import './AudioPlayer.css';
import { useRef, useState, useEffect } from 'react';
import { Card, Image, ProgressBar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


interface AudioPlayerProps {
  audioSrc: string;
  audioName: string; 
  genre: string;
}

function AudioPlayer({ audioSrc ,audioName,genre}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);


  const handlePlay = () => {
    audioRef.current!.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current!.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleSeek = (e: any) => {
    audioRef.current!.currentTime = parseFloat(e.target.value);
    setCurrentTime(parseFloat(e.target.value));
  };

  function formatDuration(durationSeconds: number) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  }

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime || 0);
    setDuration(audioRef.current?.duration || 0);
  };

  useEffect(() => {
    const currentAudioRef = audioRef.current;

    currentAudioRef?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      currentAudioRef?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="custom-container">
      <div className="custom-wrapper">
        <Card className="custom-player-card">
          <div className="custom-image-wrapper">
            <Image  src={`/${genre}.jpg`}
            
              alt="Cover Image" fluid />
          </div>
          <ProgressBar
            now={currentTime}
            max={duration}
            variant="info"
            onChange={handleSeek}
          />
          <audio ref={audioRef} src={audioSrc} />
          <div className="custom-track-duration">
            <p>{formatDuration(currentTime)}</p>
            <p>{formatDuration(duration)}</p>
          </div>
            <p className="audio-name">{audioName}</p>
          <Button variant="primary" onClick={handlePlayPause} className="custom-button">
            {isPlaying ? "Pause" : "Play"}
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default AudioPlayer;
