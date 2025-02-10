import React, { useState } from "react";
import axios from "axios";

const SpeechRecognition = ({ addItem }) => {
  const [recording, setRecording] = useState(false);

  const handleVoiceInput = async () => {
    setRecording(true);
    
    // Simulated audio URL (you need actual audio capturing here)
    const audioUrl = "https://your-audio-file-url.com/audio.mp3"; 
    
    try {
      const response = await axios.post("http://localhost:5001/api/speech-to-text", { audioUrl });
      const recognizedText = response.data.recognizedText;
      
      if (recognizedText.includes("add") || recognizedText.includes("need") || recognizedText.includes("want")) {
        const itemName = recognizedText.replace(/add|need|want/gi, "").trim();
        addItem({ name: itemName, quantity: 1 });
      }
    } catch (error) {
      console.error("Error in speech recognition:", error);
    } finally {
      setRecording(false);
    }
  };

  return (
    <div>
      <button onClick={handleVoiceInput} disabled={recording}>
        {recording ? "Listening..." : "Start Voice Input"}
      </button>
    </div>
  );
};

export default SpeechRecognition;
