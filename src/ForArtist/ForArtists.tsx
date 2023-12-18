import AudioRecorder from "./AudioRecorder"
 import { useEffect } from "react"
import AudioUpload from "./AudioUpload"

function ForArtists() {

  useEffect(()=>{

  },[])
  return (
    <>
    <AudioUpload/>
    <div>ForArtists</div>
    <AudioRecorder/>
    </>
  )
}

export default ForArtists