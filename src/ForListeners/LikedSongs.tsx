// LikedSongs.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import AudioPlayer from '../Player/AudioPlayer'; // Adjust the path based on your project structure
import './ForListeners.css';
import { Col, Row } from 'react-bootstrap';

interface Music {
  id: number;
  audioPath: string;
  name: string;
  artist: string;
  genre: string;
  isLiked: boolean; // Add isLiked property
}

const LikedSongs = () => {
  const [likedSongs, setLikedSongs] = useState<Music[]>([]);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/LikedSongs');
        // Set isLiked property based on the data
        const updatedLikedSongs = response.data.map((song: Music) => ({ ...song, isLiked: true }));
        setLikedSongs(updatedLikedSongs);
      } catch (error) {
        console.error('Error fetching liked songs:', error);
      }
    };

    fetchLikedSongs();
  }, []);


  return (
    <div className="containerWrapper">
      <h2    style={{
    fontSize: '28px',
    color: 'white',
    textAlign: 'center',
    marginBottom: '20px',
    fontFamily: 'YourPreferredFont, sans-serif',
    fontWeight: 'bold',
    background: 'rgba(34, 34, 34, 0.6)',
    backdropFilter: 'blur(10px)', // Use camelCase for backdrop-filter
    padding: '10px', // Add padding for better visibility
  }}>Liked Songs</h2>

      <Row className="align-items-end justify-content-center custom-row">
        {likedSongs.length > 0 ? ( // Check if likedSongs array is not empty
          likedSongs.map((music: Music) => (
            <Col key={music.id}>
              <div className="CardAudio">
                <AudioPlayer
                  audioSrc={music.audioPath}
                  audioName={music.name}
                  artist={music.artist}
                  genre={music.genre}
                  hideLikeButton={true}
                />
              </div>
            </Col>
          ))
        ) : (
          <div className="text-center mt-4">
            <p
              style={{
                fontSize: '18px',
                color: '#555',
                fontWeight: 'bold',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              No liked songs available
            </p>
          </div>
        )}
      </Row>
    </div>
  );
};

export default LikedSongs;
