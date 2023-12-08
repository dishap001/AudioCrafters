import { useState, useEffect, useRef } from "react";
import axios from "axios";

let audioPlayer: HTMLAudioElement | null = null;

// Change the ExtendedFile interface
interface ExtendedFile extends File {
  url?: string;
}

interface UploadedAudio {
  id: number;
  name: string;
  url: string;
}

const AudioPlay = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [audio, setAudio] = useState<string | null>(null);
  const [uploadedAudio, setUploadedAudio] = useState<UploadedAudio[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioPlayer) {
      if (isPlaying) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    }
  }, [isPlaying]);

  // Change the argument type to ExtendedFile
  const handleFileChange = async (file: ExtendedFile) => {
    const objectUrl = URL.createObjectURL(file);
    console.log("Object URL:", objectUrl);

    // Set the current audio to the newly uploaded audio
    setAudio(objectUrl);

    // Automatically start playing the audio
    setIsPlaying(true);

    // Update the state with the new audio details
    setUploadedAudio((prevAudio) => [
      ...prevAudio,
      { id: Date.now(), name: file.name, url: objectUrl },
    ]);
  };

  const handlePlayPauseClick = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleUploadClick = async () => {
    if (fileInputRef.current) {
      const file = fileInputRef.current.files && fileInputRef.current.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("audio", file);

        try {
          const response = await axios.post(
            "http://localhost:3000/UploadPathToJSON",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log("Path uploaded to JSON successfully:", response.data);
        } catch (error) {
          console.error("Error uploading path to JSON:", error);
        }
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={(e) =>
          e.target.files && handleFileChange(e.target.files[0] as ExtendedFile)
        }
      />
      <button onClick={handlePlayPauseClick}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <button onClick={handleUploadClick}>Upload</button>

      {audio && (
        <div>
          <h2>Audio Player</h2>
          <audio ref={(ref) => (audioPlayer = ref)} controls>
            <source src={audio} type="audio/mpeg" />
          </audio>
        </div>
      )}

      <div>
        <h2>Uploaded Audio:</h2>
        <ul>
          {uploadedAudio.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <audio controls>
                <source src={item.url} type="audio/mpeg" />
              </audio>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AudioPlay;
