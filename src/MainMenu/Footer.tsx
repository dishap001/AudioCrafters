import React from "react";
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {

  return (
    <div className="bg-dark text-white">
      <Container style={{ marginTop:"30px" , padding:"20px ", backdropFilter: "blur(10px)",}}>
    
        <Row>
          <Col>
            <span>© 2020 Appy. All rights reserved.</span>
          </Col>
        </Row>
        <Row>
          <Col >
            <span>Terms · Privacy Policy</span>
          </Col>
        </Row>

        <Row >
          <Col className="text-center">
            <a className="text-white me-3" href="#"><FaFacebook /></a>
            <a className="text-white me-3" href="#"><FaTwitter /></a>
            <a className="text-white me-3" href="#"><FaGithub /></a>
            <a className="text-white me-3" href="#"><FaLinkedin /></a>
            <a className="text-white" href="#"><FaInstagram /></a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
