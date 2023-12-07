
import { useRef, useState }  from "react";

const AudioRecorder = () => {
  const audioChunk = useRef<Blob[]>([]);
  const [recordings,setRecordings] = useState<string[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [streamRecording,setStreamRecording] = useState(false)

  const startRecording = async () => {
    
   try {
          const stream = await navigator.mediaDevices.getUserMedia({audio:true});
          const mediaRecorder = new MediaRecorder(stream);
          
          mediaRecorder.ondataavailable = (e) => 
          {
            if (e.data.size > 0) {
              //save the data
              audioChunk.current.push(e.data);
            }
          };

          mediaRecorder.onstop = () =>{
            const audioBlob = new Blob(audioChunk.current,{ type:'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);

            setRecordings((prevRecs ) => [...prevRecs , audioUrl ]);
          };
          mediaRecorderRef.current = mediaRecorder;
          mediaRecorder.start(); //it will start recording as soon as it allows
          setStreamRecording(true);

        }catch (error) {
      console.error("Error accessing microphone:", error);
    }
      
  };

  const stopRecording = () => {
    try{
      if (mediaRecorderRef.current  &&
         mediaRecorderRef.current.state === 'recording'){
        mediaRecorderRef.current.stop();
        setStreamRecording(false);
      }

    }catch (error) {
      console.error("Error stoping microphone:", error);
    }
  };



  return (
    <>
    <h3>Audio Recording Feature</h3>
    
    {/* <button onClick={startRecording}> Start Recording</button>
    <button onClick={stopRecording}> Stop Recording</button> */}
     <button onClick={startRecording} disabled={streamRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!streamRecording}>
        Stop Recording
      </button>

    {
      recordings.map((recUrl ,index)=> {
        return(
         <div key ={index}>
            <audio controls src={recUrl}/>
            <a href = {recUrl} download>Download</a>
         </div>
        )
      })
    }
    </>
  )
}

export default AudioRecorder;