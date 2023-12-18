
import { Link } from 'react-router-dom'
import './Home1.css'
import { FaHeadphones, FaMicrophone, FaUpload } from 'react-icons/fa6'
import { Stack } from 'react-bootstrap'

function Home() {
  return (
    <>
   
    {/* <div className="home-container" 
    style={{ marginLeft: "280px", width: "calc(100% - 280px)" }}>
      <h1>Record Music</h1>
      <h1>Get Published</h1>
      <p>Online recording studio with a built-in audience. All on AudioCrafters.</p>
      <div className="buttons-container">
            <Link to="/signin">
              <button className="SignIn">Get Started</button>
            </Link>
            <Link to="/listeners">
              <button className="listener-button">Music listeners Click Here</button>
            </Link>
          </div>
    </div> */}
     <Stack gap={3}>
    <section className="home-container" style={{ marginLeft: "280px", width: "calc(100% - 280px)" }}>
    <h1>Record Music</h1>
    <h1>Get Published</h1>
    <p>Online recording studio with a built-in audience. All on AudioCrafters.</p>
    <div className="buttons-container">
      <Link to="/signin">
        <button className="SignIn">Get Started</button>
      </Link>
      <Link to="/ForListeners">
        <button className="listener-button">Music listeners Click Here</button>
      </Link>
    </div>
  </section>


  <section className="features-section" style={{ marginLeft: "280px", width: "calc(100% - 280px)" }}>
        <div className="features-grid">
          <div className="feature">
            <i style={{ color: 'white' }}><FaMicrophone size={50} /></i>
            
            <h2 style={{ color: 'white' }}>Record Your Music</h2>
            <p>Explore the online recording studio and bring your creativity to life.</p>
          </div>

          <div className="feature">
          <i style={{ color: 'white' }}><FaUpload size={50} /></i>
            
            <h2 style={{ color: 'white' }}>Upload Your Music</h2>
            <p>Effortlessly upload your music and share it with the world.</p>
          </div>

          <div className="feature">
          <i style={{ color: 'white' }}> <FaHeadphones size={50} /></i>
            
            <h2 style={{ color: 'white' }}>Listen to Music</h2>
            <p>Discover and enjoy a variety of music from talented artists.</p>
          </div>
        </div>
      </section>
  <section>
    {/* Add your content for the third section */}
  </section>
  </Stack>
   
    
    </>
  )
}

export default Home