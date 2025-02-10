import React, { useState } from "react";
import ShoppingList from "./ShoppingList";
import SpeechRecognition from "./SpeechRecognition";
import SmartSuggestions from "./SmartSuggestions";

function App() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  return (
    <div className="App">
      <h1>Voice Shopping Assistant</h1>
      <SpeechRecognition addItem={addItem} />
      <ShoppingList items={items} />
      <SmartSuggestions />
    </div>
  );
}

export default App;
