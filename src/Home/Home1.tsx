import { Link } from "react-router-dom";
import "./Home1.css";
import { FaHeadphones, FaMicrophone, FaUpload } from "react-icons/fa6";
import Footer from "../MainMenu/Footer";

function Home() {
  return (
    <>
      <div className="Container" >
        <section  className="home-container"
             >
          <h1>Record Music</h1>
          <h1>Get Published</h1>
          <p>
            Online recording studio with a built-in audience. All on
            AudioCrafters.
          </p>
          <div className="buttons-container">
            <Link to="/signin">
              <button className="SignIn">Get Started</button>
            </Link>
            <Link to="/ForListeners">
              <button className="listener-button">
                Music listeners Click Here
              </button>
            </Link>
          </div>
        </section>
        <section className="features-section" >
          <div className="features-grid">
            <div className="feature">
              <i style={{ color: "white" }}>
                <FaMicrophone size={50} />
              </i>

              <Link to="/AudioRecorder">
   
                <h2 style={{ color: "white" }}>Record Your Music</h2>
                <p>
                  Explore the online recording studio and bring your creativity to life.
                </p>
              </Link>
            </div>

            <div className="feature">
              <i style={{ color: "white" }}>
                <FaUpload size={50} />
              </i>
              <Link to="/AudioUpload">
              <h2 style={{ color: "white" }}>Upload Your Music</h2>
              <p>Effortlessly upload your music and share it with the world.</p>
              </Link>
            </div>

            <div className="feature">
              <i style={{ color: "white" }}>
                {" "}
                <FaHeadphones size={50} />
              </i>
              <Link to="/ForListeners">
              <h2 style={{ color: "white" }}>Listen to Music</h2>
              <p>
                Discover and enjoy a variety of music from talented artists.
              </p>
              </Link>
            </div>
          </div>
        </section>
        <section className="typeGenres">
            {/* Pop Genre */}
            <Link to="/ForListeners">
              <div className="genreContainer" style={{ backgroundImage: 'url("Pop.jpg")' }}>
                <span><strong>Pop</strong></span>
              </div>
            </Link>

            {/* Classic Genre */}
            <Link to="/ForListeners">
              <div className="genreContainer" style={{ backgroundImage: 'url("Classic.jpg")' }}>
                <span><strong>Classic</strong></span>
              </div>
            </Link>

            {/* Rap Genre */}
            <Link to="/ForListeners">
              <div className="genreContainer" style={{ backgroundImage: 'url("Rap.jpg")' }}>
                <span><strong>Rap</strong></span>
              </div>
            </Link>

            {/* EDM Genre */}
            <Link to="/ForListeners">
              <div className="genreContainer" style={{ backgroundImage: 'url("EDM.jpg")' }}>
                <span><strong>EDM</strong></span>
              </div>
            </Link>

            {/* Rock Genre */}
            <Link to="/ForListeners">
              <div className="genreContainer" style={{ backgroundImage: 'url("Rock.jpg")' }}>
                <span><strong>Rock</strong></span>
              </div>
            </Link>

            {/* Show All Genres */}
            <Link to="/ForListeners">
              <div className="genreContainer" style={{ backgroundImage: 'url("default.jpg")' }}>
                <span><strong>Show All</strong></span>
              </div>
            </Link>
          </section>
          <section >
            <Footer/>
          </section>
      </div>
    </>
  );
}

export default Home;
