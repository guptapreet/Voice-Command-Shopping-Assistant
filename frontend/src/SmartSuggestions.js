import React, { useState } from "react";
import axios from "axios";

const SmartSuggestions = () => {
    const [suggestion, setSuggestion] = useState("");

    const getSuggestion = async () => {
        try {
            const response = await axios.post("https://api.openai.com/v1/completions", {
                model: "gpt-3.5-turbo",
                prompt: "Suggest a commonly needed grocery item.",
                max_tokens: 20,
            }, {
                headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
            });

            setSuggestion(response.data.choices[0].text);
        } catch (error) {
            console.error("Error getting suggestions:", error);
        }
    };

    return (
        <div>
            <button onClick={getSuggestion}>Get Smart Suggestion</button>
            <p>{suggestion}</p>
        </div>
    );
};

export default SmartSuggestions;
