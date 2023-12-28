// import  { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineAudio } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import './ForArtist.css'



const ForArtists=()=> {

  return (
  <>
     
    <div className="ForArtist">
      <div className="artists-container">
          <h2>RECORD MUSIC... UPLOAD MUSIC...</h2>
          <span>Unleash Your Musical Journey</span>
          <p>
            Unleash your creativity by recording your masterpiece directly on our
            website, and effortlessly share your artistry with a global audience
            through our easy-to-use music upload feature.
          </p>
          <div className="buttons-container">
            <Link to="/AudioRecorder"  className="listener-button">
              Record Your Music
            </Link>
            <Link to="/AudioUpload"  className="listener-button">
              Upload Your Music
            </Link>
          </div>
      </div>
      <div className='icon-style' style={{color:"white"}}>
        <i><AiOutlineAudio /></i>
      </div>


  </div>
  </>
  );
}

export default ForArtists;
