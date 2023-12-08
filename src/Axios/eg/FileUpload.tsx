import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  time: string;
}

const FileUpload: React.FC = () => {
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const [buttonName, setButtonName] = useState("Play");
  const [, setAudioURL] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const audioElement = audioElementRef.current;

    if (audioElement) {
      audioElement.pause();
      setButtonName("Play");
    }

    if (audioElement) {
      audioElement.onended = () => {
        setButtonName("Play");
      };
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/uploads');
      setUploadedFiles(response.data);
    } catch (error) {
      console.error('Error fetching data from the server:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    const audioElement = audioElementRef.current;

    if (buttonName === "Play") {
      audioElement?.play();
      setButtonName("Pause");
    } else {
      audioElement?.pause();
      setButtonName("Play");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);

      const newFile: UploadedFile = {
        id: uuidv4(),
        name: selectedFile.name,
        url: fileURL,
        time: new Date().toLocaleString(),
      };

      try {
        const response = await axios.post('http://localhost:3000/uploads', newFile);
        console.log('File details sent to the server successfully:', response.data);
      } catch (error) {
        console.error('Error sending file details to the server:', error);
      }

      setUploadedFiles([...uploadedFiles, newFile]);
      setSelectedFile(null);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>{buttonName}</button>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {/* Display the table of uploaded audio files */}
      <table>
        <thead>
          <tr>
            <th>Sr Num</th>
            <th>Audio Name</th>
            <th>URL</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {uploadedFiles.map((file, index) => (
            <tr key={file.id}>
              <td>{index + 1}</td>
              <td>{file.name}</td>
              <td><a href={file.url}>To PLay</a></td>
              
             
              <td>{file.time}</td>
              <td>
                <button onClick={() => setAudioURL(file.url)}>Play</button>
                <button onClick={handleClick}>Pause</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileUpload;
