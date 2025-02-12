

import React, { useEffect, useState } from 'react';
import SpeechRecognition from './components/SpeechRecognition';
import ShoppingList from './components/ShoppingList';
import SmartSuggestions from './components/SmartSuggestions';
import './App.css';
import AvailableProducts from './components/AvailableProducts';
import Loader from './components/Loader';

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [availableProducts, setavailableProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [suggestions, setSuggestions] = useState([]);

  const [productsLoading, setProductsLoading] = useState(false)
  const [cartLoading, setCartLoading] = useState(false)
  const [suggestionLoading, setSuggestionLoading] = useState(false)

  const fetchProducts = async () => {
    setProductsLoading(true)
    try {
      const response = await fetch("https://voice-command-shopping-assistant.onrender.com/api/products", {
        method: "GET",
        mode: "cors", // Ensures CORS headers are respected
      })
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setavailableProducts(data);
      setFilteredProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setProductsLoading(false)
  };

  const fetchCartItems = async () => {
    setCartLoading(true)
    try {
        const response = await fetch("https://voice-command-shopping-assistant.onrender.com/api/cart");
        const data = await response.json();
  
        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch cart items");
        }
  
        setShoppingList(data); // Assuming data is an array of cart items
    } catch (error) {
        console.error("Error fetching cart items:", error.message);
    }
    setCartLoading(false)
  };
  const fetchSmartSuggestions = async () => {
    setSuggestionLoading(true)
    try {
        const response = await fetch("https://voice-command-shopping-assistant.onrender.com/api/smart-suggestions", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
  
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch smart suggestions");
        }
  
        setSuggestions(data.suggestions);
    } catch (error) {
        console.error("Error fetching smart suggestions:", error);
    }
    setSuggestionLoading(false)

  };

  useEffect(() => {
    fetchProducts();
    fetchCartItems();
    fetchSmartSuggestions();
  }, []);


  const handleAddItem = async (item, quantity) => {
    try {
        const response = await fetch("https://voice-command-shopping-assistant.onrender.com/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: item.name, 
                quantity: quantity, 
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to add item to cart");
        }
        fetchCartItems()

    } catch (error) {
        console.error("Error adding item to cart:", error.message);
    }
};

const handleRemoveItem = async (id) => {
  try {
      const response = await fetch(`https://voice-command-shopping-assistant.onrender.com/api/cart/${id}`, {
          method: "DELETE",
      });

      if (!response.ok) {
          throw new Error("Failed to remove item");
      }

      // Update shopping list after deletion
      setShoppingList((prevList) => prevList.filter((item) => item._id !== id));
  } catch (error) {
      console.error("Error removing item:", error);
  }
};

const placeOrder = async () => {
  try {
      const response = await fetch("https://voice-command-shopping-assistant.onrender.com/api/orders", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
      });

      const data = await response.json();
      if (!response.ok) {
          throw new Error(data.error || "Failed to place order");
      }

      // Clear the shopping list after ordering
      setShoppingList([]);

      alert("Order placed successfully!");
  } catch (error) {
      console.error("Error placing order:", error);
      alert(error.message);
  }
};




  return (
    <div className=" bg-slate-100 px-52  text-slate-800 w-full h-full">
      <div className='h-[7vh] border-b-2 flex  items-center gap-5'>

        <header className='text-xl font-bold text-slate-800 text-nowrap'>Voice Command Shopping Assistant</header>
        <SpeechRecognition
          onItemAdd={handleAddItem}
          onItemRemove={handleRemoveItem}
          shoppingList={shoppingList}
          availableProducts={availableProducts} 
          setFilteredProducts={setFilteredProducts}
        />
      </div>
      <div className='flex gap-4 w-full py-4 h-[93vh]'>
        <div className='w-[70%] h-fullc bg-blue-100 rounded-lg p-4 pt-2 shadow-md'>
          {
            productsLoading ?
              <Loader />
              :
              <AvailableProducts shoppingList={shoppingList} availableProducts={filteredProducts} onAddItem={handleAddItem} />
          }
        </div>
        <div className='w-[30%] h-full flex flex-col  gap-4'>
          <div className='h-[50%] bg-emerald-100 w-full p-4 rounded-lg shadow-md'>
            <ShoppingList  placeOrder={placeOrder} cartLoading={cartLoading} shoppingList={shoppingList} onRemoveItem={handleRemoveItem} onUpdateQuantity={handleAddItem} />
          </div>
          <div className='h-[50%] bg-violet-100 p-4 rounded-lg shadow-md'>
            <SmartSuggestions suggestionLoading={suggestionLoading} suggestions={suggestions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
