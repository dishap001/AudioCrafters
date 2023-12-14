import React, { useState, useEffect, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Table, Button, Form, Container, Row, Col} from 'react-bootstrap';


import UserServices from '../Axios/UserServices';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  const userServices = UserServices();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userServices().getUploadedAudio();
        setUploadedFiles(response.data);
      } catch (error) {
        console.error('Error fetching data from the server:', error);
      }
    };
    fetchData();
  }, [userServices]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleGenreChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        await userServices().addUploadedAudio(newFile);
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
      await userServices().deleteUploadedAudio(id);
      setUploadedFiles((prevFiles) => prevFiles.filter(file => file.id !== id));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };


  return (
    <Container fluid className="d-flex flex-column align-items-center justify-content-center">
      <div className="my-4"> {/* Add margin for spacing */}
      <Row className="mb-3">
        <Col className="d-flex justify-content-right">
          <Button variant="primary" onClick={() => setIsFormVisible(!isFormVisible)}>
            {isFormVisible ? 'Back' : 'New Project'}
          </Button>
        </Col>
      
      </Row>
  {isFormVisible && (
    <Row>
      <Col>
        <Form>
          <Form.Group controlId="audioFile">
            <Form.Label>Choose audio file</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Form.Group controlId="genreSelect">
            <Form.Label>Genre</Form.Label>
            <Form.Control as="select" value={selectedGenre} onChange={handleGenreChange}>
              <option value="">Select Genre</option>
              <option value="Pop">Pop</option>
              <option value="Classic">Classic</option>
              <option value="Rock">Rock</option>
              <option value="EDM">EDM</option>
              <option value="Rap">Rap</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="artistName">
            <Form.Label>Artist</Form.Label>
            <Form.Control type="text" value={artistName} onChange={handleArtistChange} />
          </Form.Group>
          <div className="d-flex justify-content-center"> {/* Center the button */}
            <Button variant="primary" onClick={handleUpload}>
              Upload
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  )}
</div>

      {/* Display the table of uploaded audio files */}
      <Row>
        <Col>
        <div className="table-responsive">
          <Table >
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
                    <audio controls>
                      <source src={file.url} type="audio/mpeg" />
                    </audio>
                  </td>
                  <td>{file.time}</td>
                  <td>{file.genre}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleDownload(file.url, file.name)}>
                      Download
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(file.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AudioUpload;
