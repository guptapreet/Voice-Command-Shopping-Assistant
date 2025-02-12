import React, { useState } from 'react';
import { BsStars } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";

const SpeechRecognition = ({ onItemAdd, onItemRemove, shoppingList, availableProducts, setFilteredProducts }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcribedText, setTranscribedText] = useState('');

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true; // Keep listening until stopped
        recognition.interimResults = true; // Show live results

        recognition.onstart = () => {
            setIsListening(true);
            setTranscribedText(""); // Clear previous text when new session starts
        };

        recognition.onresult = (event) => {
            let interimTranscript = "";
            let finalTranscript = "";

            for (let i = 0; i < event.results.length; i++) {
                let transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + " "; // Store final text
                } else {
                    interimTranscript += transcript + " "; // Live update text
                }
            }

            setTranscribedText(interimTranscript || finalTranscript);
            if (finalTranscript) handleCommand(finalTranscript);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    console.log("-0000000000availableProducts", availableProducts);

    const findProduct = (item) => {
        const product = availableProducts.find((prod) => prod.name.toLowerCase() === item.toLowerCase())
        return product;
    }
    const filterProducts = (item) => {
        return availableProducts.filter((prod) =>
            prod.name.toLowerCase().includes(item.toLowerCase()) // ✅ Partial match
        );
    };
    const findProductInCart = (item) => {
        const product = shoppingList.find((prod) => prod.product.name.toLowerCase() === item.toLowerCase())
        return product;
    }
    const handleCommand = (command) => {
        const lowerCaseCommand = command.toLowerCase();
        if (lowerCaseCommand.includes('add')) {
            const words = lowerCaseCommand.split(' ');
            const itemIndex = words.indexOf('add') + 1;
            let item = words.slice(itemIndex).join(' ').trim();

            // Extract quantity from the command
            const quantityMatch = item.match(/\d+/); // Finds the first number in the sentence
            const quantity = quantityMatch ? parseInt(quantityMatch[0], 10) : 1; // Default to 1 if no number is found

            // Remove the quantity number from the item name
            item = item.replace(quantityMatch, "").trim();

            const product = findProduct(item);
            console.log("------item", item);
            console.log("------quantity", quantity);

            if (product) onItemAdd(product, quantity);
        } else if (lowerCaseCommand.includes('remove')) {
            const item = lowerCaseCommand.split('remove')[1]?.trim();
            const product = findProductInCart(item);
            console.log("------product", product);

            if (product) onItemRemove(product._id);
        } else if (lowerCaseCommand.includes('search')) {
            const item = lowerCaseCommand.split('search')[1]?.trim();
            const products = filterProducts(item);

            if (products) setFilteredProducts(products)
        } else {
            console.log('Command not recognized:', command);
        }
    };

    return (
        <div className="flex w-full items-center gap-4">
            {
                transcribedText.length !== 0 &&
                <button
                    onClick={() => setTranscribedText("")}
                    className='bg-red-200 text-xl px-3 rounded-lg text-red-600  py-[0.6rem]'
                >
                    <MdOutlineDeleteOutline />
                </button>
            }
            <button
                onClick={startListening}
                className={`flex gap-2 justify-center min-w-44 items-center bg-violet-800 hover:bg-violet-700 text-white rounded-lg px-4 py-2 transition-all 
                    ${isListening ? 'animate-pulse' : ''}`} // Flicker effect
            >
                <BsStars />
                {isListening ? 'Listening...' : 'Start Listening'}
            </button>

            <div className="text-violet-800 ">
                <p className="text-lg">{transcribedText.length === 0 && isListening ? "Say something..." : transcribedText}</p>
            </div>
        </div>
    );
};

export default SpeechRecognition;
