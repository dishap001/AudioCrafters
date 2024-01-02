
import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import UserServices from "../Axios/UserServices";
import AudioPlayer from "../Player/AudioPlayer";
import { FaSearch } from "react-icons/fa";
import './ForListeners.css'



interface Audio {
  id: number;
  name: string;
  artist: string;
  genre: string;
  path: string;
  // url: string;
  audioPath: string;
}

const Audios:  React.FC = () => {
  const [audios, setAudios] = useState<Audio[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const userServices = UserServices();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Audio[]>([]);


  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const fetchAudios = async () => {
    try {
      const response = await userServices().getAudio();
      setAudios(response.data);
    } catch (error) {
      console.error("Error fetching audios:", error);
    }
  };
  useEffect(() => {
    fetchAudios();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSearchButtonClick = () => {
    const filteredAudios = audios.filter((audio) => {
      const searchMatch = audio.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return searchMatch;
    });
    setSearchResults(filteredAudios);
   
    console.log(filteredAudios);
  };
  const handleGenreClick = (genre: string | null) => {
    setSelectedGenre(genre);
    setSearchResults([]);
  };


  const filteredAudios = selectedGenre
    ? audios.filter((audio) => audio.genre === selectedGenre)
    : audios;
  const displayedAudios =
    searchResults.length > 0 ? searchResults : filteredAudios;
  return (
    <div className="text-light d-flex align-items-center justify-content-center flex-column containerWrapper">
    <div className="Searching searchingContainer">
      <div className="searchBox">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          />
      </div>
      <i onClick={handleSearchButtonClick} ><FaSearch /></i>
          </div>
      <Row className="mb-2 mt-2 flex-wrap justify-content-center custom-row">
        <Col xs="auto">
          <Button onClick={() => handleGenreClick("Pop")}>Pop</Button>
        </Col>
        <Col xs="auto">
          <Button onClick={() => handleGenreClick("Classic")}>Classic</Button>
        </Col>
        <Col xs="auto">
          <Button onClick={() => handleGenreClick("Rock")}>Rock</Button>
        </Col>
        <Col xs="auto">
          <Button onClick={() => handleGenreClick("EDM")}>EDM</Button>
        </Col>
        <Col xs="auto">
          <Button onClick={() => handleGenreClick("Rap")}>Rap</Button>
        </Col>
        <Col xs="auto">
          <Button onClick={() => handleGenreClick(null)}>Show All</Button>
        </Col>
      </Row>

      <Row className="align-items-end justify-content-center custom-row">
        {displayedAudios.length > 0 ? (
          displayedAudios.map((audio) => (
            <Col key={audio.id}>
             
              <div className="CardAudio">
                {(audio.audioPath || audio.path) && (
                  <AudioPlayer
                    audioSrc={audio.audioPath || audio.path}
                    audioName={audio.name}
                    artist={audio.artist}
                    genre={audio.genre}
                  />
                )}
              </div>
            </Col>
          ))
        ) : (
          <div className="text-center mt-4">
            <p
              style={{
                fontSize: "18px",
                color: "#555",
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              No audios available
            </p>
          </div>
        )}
      </Row>
    </div>
  );
};

export default Audios;
