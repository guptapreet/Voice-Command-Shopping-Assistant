// src/SmartSuggestions.js

import React, { useState } from 'react';

const SmartSuggestions = ({ suggestions ,suggestionLoading}) => {

   

    return (
        <div className="smart-suggestions">
            <h3>Smart Suggestions</h3>
            <ul>
                {suggestions.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default SmartSuggestions;
