/* eslint-disable react-hooks/exhaustive-deps */
import  { useState, useEffect } from 'react';
import AudioPlayer from '../Player/AudioPlayer';

import UserServices from '../Axios/UserServices';

function ForListeners() {
  const [fetchedFiles, setFetchedFiles] = useState<{ url: string ,name :string}[]>([]);
  const userServices = UserServices();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'your-api-endpoint' with the actual endpoint to fetch data from
        const response = await userServices().getUploadedAudio();
        setFetchedFiles(response.data);
      } catch (error) {
        console.error('Error fetching data from the server:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      {/* Display the fetched audio files */}
      {fetchedFiles.map((file, index) => (
        <AudioPlayer key={index} audioSrc={file.url} audioName={file.name}/>
      ))}
    </div>
  );
}

export default ForListeners;
