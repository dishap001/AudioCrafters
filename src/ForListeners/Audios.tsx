import  { useState, useEffect } from 'react';
import UserServices from '../Axios/UserServices';


interface Audio {
  id: number;
  name: string;
  artist: string;
  genre: string;
  path: string;
}

const Audios = () => {
  const [audios, setAudios] = useState<Audio[]>([]);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>List of Audios</h2>
      <ul>
        {audios && audios.length > 0 ? (
          audios.map((audio) => (
            <li key={audio.id}>
              <strong>{audio.name}</strong> by {audio.artist} (Genre: {audio.genre})
              <audio controls src={audio.path} />
            </li>
          ))
        ) : (
          <p>No audios available</p>
        )}
      </ul>
    </div>
  );
};

export default Audios;


