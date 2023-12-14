
// import React, { useState, useEffect } from 'react';
// import { Row, Col, Button } from 'react-bootstrap';
// import UserServices from '../Axios/UserServices';
// import AudioPlayer from '../Player/AudioPlayer';

// interface Audio {
//   id: number;
//   name: string;
//   artist: string;
//   genre: string;
//   path: string;
//   url: string;
// }

// const Audios: React.FC = () => {
//   const [audios, setAudios] = useState<Audio[]>([]);
//   const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
//   const userServices = UserServices();

//   useEffect(() => {
//     const fetchAudios = async () => {
//       try {
//         const response = await userServices().getAudio();
//         setAudios(response.data);
//       } catch (error) {
//         console.error('Error fetching audios:', error);
//       }
//     };
//     fetchAudios();
//   }, [userServices]);

//   const handleGenreClick = (genre: string | null) => {
//     setSelectedGenre(genre);
//   };

//   // Filter audios based on selected genre
//   const filteredAudios = selectedGenre
//     ? audios.filter((audio) => audio.genre === selectedGenre)
//     : audios;

//   return (
//     <div>
//       <Row className="justify-content-center mb-2">
//         <Col xs="auto">
//           <Button onClick={() => handleGenreClick("Pop")}>Pop</Button>
//         </Col>
//         <Col xs="auto">
//           <Button onClick={() => handleGenreClick("Classic")}>Classic</Button>
//         </Col>
//         <Col xs="auto">
//           <Button onClick={() => handleGenreClick("Rock")}>Rock</Button>
//         </Col>
//         <Col xs="auto">
//           <Button onClick={() => handleGenreClick("EDM")}>EDM</Button>
//         </Col>
//         <Col xs="auto">
//           <Button onClick={() => handleGenreClick("Rap")}>Rap</Button>
//         </Col>
//         <Col xs="auto">
//           <Button onClick={() => handleGenreClick(null)}>Show All</Button>
//         </Col>
//       </Row>

//       {/* Display the filtered audio files */}
//       {filteredAudios && filteredAudios.length > 0 ? (
//         <div>
//           {filteredAudios.map((audio) => (
//             <div key={audio.id}>
//               {(audio.url || audio.path) && <AudioPlayer audioSrc={audio.url || audio.path} audioName={audio.name} />}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center mt-4">
//           <p style={{
//             fontSize: "18px",
//             color: "#555",
//             fontWeight: "bold",
//             fontFamily: "Montserrat, sans-serif",
//           }}>No audios available</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Audios;
import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import UserServices from '../Axios/UserServices';
import AudioPlayer from '../Player/AudioPlayer';

interface Audio {
  id: number;
  name: string;
  artist: string;
  genre: string;
  path: string;
  url: string;
}

const Audios: React.FC = () => {
  const [audios, setAudios] = useState<Audio[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const userServices = UserServices();

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const response = await userServices().getAudio();
        setAudios(response.data);
      } catch (error) {
        console.error('Error fetching audios:', error);
      }
    };
    fetchAudios();
  }, [userServices]);

  const handleGenreClick = (genre: string | null) => {
    setSelectedGenre(genre);
  };

  // Filter audios based on selected genre
  const filteredAudios = selectedGenre
    ? audios.filter((audio) => audio.genre === selectedGenre)
    : audios;

  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <Row className="mb-2 flex-wrap justify-content-center">
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

      {/* Display the filtered audio files in a responsive grid */}
      <Row className="justify-content-center">
        {filteredAudios && filteredAudios.length > 0 ? (
          filteredAudios.map((audio) => (
              <Col >
            <Card key={audio.id} className="mb-4 d-flex justify-content-center align-items-center border-0">
              {(audio.url || audio.path) && <AudioPlayer audioSrc={audio.url || audio.path} audioName={audio.name} genre={audio.genre} />}
            </Card>
          </Col>
          ))
        ): (
          <div className="text-center mt-4">
            <p style={{
              fontSize: "18px",
              color: "#555",
              fontWeight: "bold",
              fontFamily: "Montserrat, sans-serif",
            }}>No audios available</p>
          </div>
        )}
      </Row>
    </div>
  );
};

export default Audios;
