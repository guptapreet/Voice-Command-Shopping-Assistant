// require("dotenv").config();
// const axios = require("axios");

// const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;

// /**
//  * Function to transcribe audio using AssemblyAI
//  * @param {string} audioUrl - URL of the uploaded audio file
//  */
// async function transcribeAudio(audioUrl) {
//     try {
//         // Step 1: Send audio for transcription
//         const response = await axios.post(
//             "https://api.assemblyai.com/v2/transcript",
//             { audio_url: audioUrl },
//             {
//                 headers: { Authorization: ASSEMBLYAI_API_KEY }
//             }
//         );

//         const transcriptId = response.data.id;
//         console.log("Transcription started:", transcriptId);

//         // Step 2: Poll for transcription result
//         let transcript;
//         while (true) {
//             const result = await axios.get(
//                 `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
//                 {
//                     headers: { Authorization: ASSEMBLYAI_API_KEY }
//                 }
//             );
//             if (result.data.status === "completed") {
//                 transcript = result.data.text;
//                 break;
//             } else if (result.data.status === "failed") {
//                 console.error("Transcription failed:", result.data.error);
//                 return null;
//             }
//             await new Promise((res) => setTimeout(res, 3000)); // Wait before retrying
//         }

//         console.log("Transcription:", transcript);
//         return transcript;

//     } catch (error) {
//         console.error("Error in speech recognition:", error);
//         return null;
//     }
// }

// module.exports = transcribeAudio;
