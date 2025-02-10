const axios = require("axios");

const speechToText = async (audioUrl) => {
  try {
    const response = await axios.post(
      "https://api.assemblyai.com/v2/transcript",
      { audio_url: audioUrl },
      { headers: { Authorization: process.env.ASSEMBLYAI_API_KEY } }
    );

    return response.data.text;
  } catch (err) {
    console.error("Speech recognition error:", err);
    throw err;
  }
};

module.exports = speechToText;
