import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  time: string;
  genre: string;
  artist: string;
}

const AudioUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [artistName, setArtistName] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data.json');
      setUploadedFiles(response.data);
    } catch (error) {
      console.error('Error fetching data from the server:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const handleGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };
  const handleArtistChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArtistName(e.target.value);
  };
  const handleUpload = async () => {
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);

      const newFile: UploadedFile = {
        id: uuidv4(),
        name: selectedFile.name,
        url: fileURL,
        time: new Date().toLocaleString(),
        genre: selectedGenre,
        artist: artistName,
      };

      try {
        const response = await axios.post('http://localhost:3000/UploadedAudio', newFile);
        console.log('File details sent to the server successfully:', response.data);
      } catch (error) {
        console.error('Error sending file details to the server:', error);
      }

      setUploadedFiles([...uploadedFiles, newFile]);
      setSelectedFile(null);
      setSelectedGenre('');
      setIsFormVisible(false);
    }
  };
  const handleDownload = (url: string, name: string) => {
    // Create a hidden link and trigger a click to download the file
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/UploadedAudio/${id}`);
      console.log('File deleted successfully:', response.data);

      setUploadedFiles((prevFiles) => prevFiles.filter(file => file.id !== id));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'X' : 'New Project'}
      </button>

      {isFormVisible && (
        <div>
          <input type="file" onChange={handleFileChange} />
          <label>
            Genre:
            <select value={selectedGenre} onChange={handleGenreChange}>
              <option value="">Select Genre</option>
              <option value="Jazz">Jazz</option>
              <option value="Pop">Pop</option>
              <option value="Classic">Classic</option>
              {/* Add more genre options as needed */}
            </select>
          </label>
          <label>
            Artist:
            <input type="text" value={artistName} onChange={handleArtistChange} />
          </label>
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}

      {/* Display the table of uploaded audio files */}
      <table>
        <thead>
          <tr>
            <th>Sr Num</th>
            <th>Artist</th>
            <th>Audio Name</th>
            <th>URL</th>
            <th>Time</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {uploadedFiles.map((file, index) => (
            <tr key={file.id}>
              <td>{index + 1}</td>
              <td>{file.artist}</td>
              <td>{file.name}</td>
              <td>
                {' '}
                <audio controls>
                  <source src={file.url} type="audio/mpeg" />
                </audio>
              </td>
              <td>{file.time}</td>
              <td>{file.genre}</td>
              <td>
              <button onClick={() => handleDownload(file.url, file.name)}>Download</button>
                <button onClick={() => handleDelete(file.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AudioUpload;
