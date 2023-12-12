/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import AudioPlayer from '../Player/AudioPlayer';

import UserServices from '../Axios/UserServices';

interface AudioFile {
  url: string;
  name: string;
  genre: string;
}

function ForListeners() {
  const [allFiles, setAllFiles] = useState<AudioFile[]>([]);
  const [displayedFiles, setDisplayedFiles] = useState<AudioFile[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const userServices = UserServices();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userServices().getUploadedAudio();
        const files: AudioFile[] = response.data;
        setAllFiles(files);
        filterFilesByGenre(files, selectedGenre);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching data from the server:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, [selectedGenre]);

  const filterFilesByGenre = (files: AudioFile[], genre: string | null) => {
    const filteredFiles = genre ? files.filter(file => file.genre === genre) : files;
    setDisplayedFiles(filteredFiles);
  };

  const handleGenreClick = (genre: string | null) => {
    setSelectedGenre(genre);
    filterFilesByGenre(allFiles, genre);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleGenreClick('Jazz')}>Jazz</button>
        <button onClick={() => handleGenreClick('Pop')}>Pop</button>
        <button onClick={() => handleGenreClick('Classic')}>Classic</button>
        <button onClick={() => handleGenreClick('Rock')}>Rock</button>
        <button onClick={() => handleGenreClick('EDM')}>EDM</button>
        <button onClick={() => handleGenreClick('Rap')}>Rap</button>
        {/* Add more genre buttons as needed */}
        <button onClick={() => handleGenreClick(null)}>Show All</button>
      </div>
      {/* Display the filtered audio files or a message */}
      {loading ? (
        <p>Loading...</p>
      ) : displayedFiles.length === 0 ? (
        <p>No music available</p>
      ) : (
        displayedFiles.map((file, index) => (
          <AudioPlayer key={index} audioSrc={file.url} audioName={file.name} />
        ))
      )}
    </div>
  );
}

export default ForListeners;
