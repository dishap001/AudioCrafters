/* eslint-disable @typescript-eslint/no-explicit-any */
import './AudioPlayer.css';
import { useRef, useState, useEffect } from 'react';
import { Card, Image, ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ImEye , ImEyeBlocked } from "react-icons/im";
import { FaPlay ,FaPause ,FaHeart, FaRegHeart} from "react-icons/fa";

interface AudioPlayerProps {
  audioSrc: string;
  audioName: string; 
  artist:string;
  genre: string;
}

function AudioPlayer({ audioSrc ,audioName,artist,genre,}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLiked, setLiked] = useState(false);
  const handlePlay = () => {
    console.log('Audio Source URL:', audioSrc);
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
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  
    const toggleLike = () => {
      setLiked(!isLiked);
    };


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
          <audio ref={audioRef} src={audioSrc}   />
          <div className="custom-track-duration">
            <p>{formatDuration(currentTime)}</p>
            <p>{formatDuration(duration)}</p>
          </div>

            <div className="custom-dropdown-container">
            <p className="audio-name">{audioName  } 
              <button onClick={toggleLike} className="custom-dropdown-button"> 
                {isLiked ? <FaHeart color="#FF0000" size={20} /> : <FaRegHeart size={20} />}
              </button>
              <button onClick={toggleDropdown} className="custom-dropdown-button">
                {isDropdownOpen ? <ImEyeBlocked /> : <ImEye />}
              </button>
            </p>
           
            {isDropdownOpen && (
              <div className="custom-dropdown-content">
                <p>Name: {audioName}</p>
                <p>Artist: {artist}</p>
                <p>Genre: {genre}</p>
              </div>
            )}
          </div>
          <button  onClick={handlePlayPause} className="custom-button">
            {isPlaying ? <FaPause />: <FaPlay />}
          </button>
        </Card>
      </div>
    </div>
  );
}

export default AudioPlayer;
