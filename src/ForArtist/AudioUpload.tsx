import React, { useState, useEffect, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Table, Button, Form, Container, Row, Col } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import UserServices from "../Axios/UserServices";
import "bootstrap/dist/css/bootstrap.min.css";
import './AudioRecorder.css'

interface UploadedFile {
  id: string;
  name: string;
  // url: string;
  time: string;
  genre: string;
  artist: string;
  audioPath: string;
}

const AudioUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [audioName, setAudioName] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [audioPath, setAudioPath] = useState<string>("");

  const userServices = UserServices();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userServices().getUploadedAudio();
        setUploadedFiles(response.data);
      } catch (error) {
        console.error("Error fetching data from the server:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      // const fileURL = URL.createObjectURL(selectedFile);
      // console.log('File URL:', fileURL);
      // console.log('File Details:', selectedFile.name, selectedFile.size, selectedFile.type);

      const newFile: UploadedFile = {
        id: uuidv4(),
        name: audioName,
        // url: fileURL,
        time: new Date().toLocaleString(),
        genre: selectedGenre,
        artist: artistName,
        audioPath: audioPath,
      };

      try {
        const response = await userServices().addUploadedAudio(newFile);
        console.log(response.data);
      } catch (error) {
        console.error("Error sending file details to the server:", error);
      }
      try {
        const res = await userServices().addAudio(newFile);
        console.log(res.data);
      } catch (error) {
        console.error("Error sending file details to the server:", error);
      }

      setUploadedFiles([...uploadedFiles, newFile]);
      setSelectedFile(null);
      setAudioName("");
      setSelectedGenre("");
      setAudioPath("");
      setIsFormVisible(false);
    }
  };

  const handleDownload = (url: string, name: string) => {
    // Create a hidden link and trigger a click to download the file
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
  };

  const handleDelete = async (id: string) => {
    try {
      await userServices().deleteUploadedAudio(id);
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((file) => file.id !== id)
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center AudioRecorder"
    >
      <div className="my-4">
        {" "}
        <Row className="mb-3">
          <Col className="d-flex justify-content-right">
            <Button
              variant="primary"
              onClick={() => setIsFormVisible(!isFormVisible)}
            >
              {isFormVisible ? "Back" : "New Project"}
            </Button>
          </Col>
        </Row>
        {isFormVisible && (
          <Row className="customRow-uploadAudio">
            <Col>
              <Form>
                <Form.Group controlId="audioFile">
                  <Form.Label>Choose audio file</Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
                <Form.Group controlId="audioName">
                  <Form.Label>Audio Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={audioName}
                    onChange={(e) => setAudioName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="genreSelect">
                  <Form.Label>Genre</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                  >
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
                  <Form.Control
                    type="text"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="audioPath">
                  <Form.Label>Audio Path</Form.Label>
                  <Form.Control
                    type="text"
                    value={audioPath}
                    onChange={(e) => setAudioPath(e.target.value)}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button variant="primary" onClick={handleUpload} style={{marginTop:"20px",marginBottom:"10px"}}>  Upload
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        )}
      </div>

      {/* Display the table of uploaded audio files */}
      <Row>
        <Col >
          <div className="table-responsive">
            <Table striped bordered hover responsive>
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
                      <audio
                        controls
                        onError={(e) => console.error("Audio error:", e)}
                      >
                        <source src={file.audioPath} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </td>
                    <td>{file.time}</td>
                    <td>{file.genre}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() =>
                          handleDownload(file.audioPath, file.name)
                        }
                      >
                        <FaDownload />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(file.id)}
                      >
                        <MdDelete />
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
