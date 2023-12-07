import "./AudioRecorder.css"; 
import { useRef, useState }  from "react";

const AudioRecorder = () => {
  const audioChunk = useRef<Blob[]>([]);
  const [recordings,setRecordings] = useState<string[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [streamRecording,setStreamRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const timerRef = useRef<number | null>(null);

  const startRecording = async () => {
    
   try {
          const stream = await navigator.mediaDevices.getUserMedia({audio:true});
          const mediaRecorder = new MediaRecorder(stream);

            // Reset the audioChunk array for a new recording
           audioChunk.current = [];
          
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

           setRecordings((prevRecs ) => [ audioUrl,...prevRecs  ]);
        
            setRecordingDuration(0);
            clearInterval(timerRef.current!); 
            
         
          };
          mediaRecorderRef.current = mediaRecorder;
          mediaRecorder.start(); //it will start recording as soon as it allows
          setStreamRecording(true);

          
      // Update recording duration every second

      timerRef.current = window.setInterval(() => {
        setRecordingDuration((prevDuration) => prevDuration + 1);
      }, 1000);
          mediaRecorder.onpause = () => {
            clearInterval(timerRef.current!);
          };
    
          mediaRecorder.onresume = () => {
            // Resume the existing timer
            clearInterval(timerRef.current!);
            timerRef.current = window.setInterval(() => {
              setRecordingDuration((prevDuration) => prevDuration + 1);
            }, 1000);
          }        
        }
      
        catch (error) {
      console.error("Error accessing microphone:", error);
    }
      
  };

  const stopRecording = () => {
    try{
      if (mediaRecorderRef.current  &&
         mediaRecorderRef.current.state === 'recording'){
        mediaRecorderRef.current.stop();
        setStreamRecording(false);
        clearInterval(timerRef.current!);
      }

    }catch (error) {
      console.error("Error stoping microphone:", error);
    }
  };
  const pauseRecording = () => {
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
        clearInterval(timerRef.current!);
      }
    } catch (error) {
      console.error("Error pausing recording:", error);
    }
  };

  const resumeRecording = () => {
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
        mediaRecorderRef.current.resume();
        setIsPaused(false);

          // Resume the existing timer
      timerRef.current = window.setInterval(() => {
        setRecordingDuration((prevDuration) => prevDuration + 1);
      }, 1000);
      }
    } catch (error) {
      console.error("Error resuming recording:", error);
    }
  };
  const deleteRecording = (indexToDelete:number) => {
    setRecordings((prevRecs) => prevRecs.filter((_, index) => index !== indexToDelete));
  };
  

  return (
    <>
    <div className="audio-recorder-container">
    <h3>Audio Recording Feature</h3>
   

<div className="recording-info">
        <p>Recording Time: {recordingDuration} seconds</p>
        <progress max="100" value={(recordingDuration / 10) * 10}></progress>
      </div>
    <button onClick={startRecording} disabled={streamRecording}>
      Start Recording
    </button>
    <button onClick={pauseRecording} disabled={!streamRecording || isPaused}>
      Pause Recording
    </button>
    <button
      onClick={resumeRecording}
      disabled={!streamRecording || !isPaused}
    >
      Resume Recording
    </button>
    <button onClick={stopRecording} disabled={!streamRecording}>
      Stop Recording
    </button>


<table>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Recording</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recordings.map((recUrl, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <audio controls src={recUrl} />
                </td>
                <td>
                  <button>
                    <a href={recUrl} download>
                      Download
                    </a>
                  </button>
                  <button onClick={() => deleteRecording(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  </div>
  </>
  )
}

export default AudioRecorder;