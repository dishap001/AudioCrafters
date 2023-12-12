/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import AudioPlayer from '../Player/AudioPlayer';
import UserServices from '../Axios/UserServices';
import { Button, Row, Col } from 'react-bootstrap';


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
    <div className="text-center">
      <Row className="justify-content-center mb-2">
        <Col xs="auto">
          {" "}
          <Button onClick={() => handleGenreClick("Jazz")}>Jazz</Button>{" "}
        </Col>
        <Col xs="auto">
          {" "}
          <Button onClick={() => handleGenreClick("Pop")}>Pop</Button>{" "}
        </Col>
        <Col xs="auto">
          {" "}
          <Button onClick={() => handleGenreClick("Classic")}>
            Classic
          </Button>{" "}
        </Col>
        <Col xs="auto">
          <Button onClick={() => handleGenreClick("Rock")}>Rock</Button>
        </Col>
        <Col xs="auto">
          {" "}
          <Button onClick={() => handleGenreClick("EDM")}>EDM</Button>{" "}
        </Col>
        <Col xs="auto">
          {" "}
          <Button onClick={() => handleGenreClick("Rap")}>Rap</Button>{" "}
        </Col>
        <Col xs="auto">
          {" "}
          <Button onClick={() => handleGenreClick(null)}>Show All</Button>{" "}
        </Col>
      </Row>
      {/* Display the filtered audio files in a grid */}
      {loading ? (
        <div className="text-center mt-4">
          <p style={{
              fontSize: "18px",
              color: "#555",
              fontWeight: "bold",
              fontFamily: "Montserrat, sans-serif",
            }} > Loading... </p>
        </div>
      ) : displayedFiles.length === 0 ? (
        <div className="text-center mt-4">
          <p style={{
              fontSize: "18px",
              color: "#555",
              fontWeight: "bold",
              fontFamily: "Montserrat, sans-serif",
            }} > No music available</p>
        </div>
      ) : (
        <Row className="justify-content-center">
          {displayedFiles.map((file, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <AudioPlayer audioSrc={file.url} audioName={file.name} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default ForListeners;
