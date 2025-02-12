# Voice-Command-Shopping-Assistant


[![Deployment](https://img.shields.io/badge/Deployed-Live-green)](https://voice-command-shopping-assistant-xi2p.vercel.app)  

🔗 **Live Demo:** [Voice Command Shopping Assistant](https://voice-command-shopping-assistant-xi2p.vercel.app)  

## **Overview**  
The **Voice Command Shopping Assistant** is a voice-based shopping list manager that enhances user convenience with smart suggestions. It enables users to **add, remove, and search for items via voice commands** while providing **personalized recommendations** based on shopping history and seasonal trends.  

This project leverages **React** (frontend) and **Node.js/Express with MongoDB** (backend) for a **scalable, real-time, and intelligent shopping assistant**.  

---

## **Key Features**  

### **1. Voice Input**  
✅ **Voice Command Recognition** – Add/remove items via voice commands (e.g., “Add milk”).  
✅ **Natural Language Processing (NLP)** – Understands varied user phrases.  
✅ **Multilingual Support** – Future support for multiple languages.  

### **2. Smart Suggestions**  
✅ **Product Recommendations** – Suggests items based on purchase history.  
✅ **Seasonal Recommendations** – Suggests relevant items based on seasons.  
✅ **Substitutes** – Offers alternatives if an item is unavailable.  

### **3. Shopping List Management**  
✅ **Add/Remove Items** – Modify list via voice (e.g., “Remove apples”).  
✅ **Categorization** – Groups items into categories (e.g., dairy, produce).  
✅ **Quantity Management** – Supports specifying amounts (e.g., “Add 2 bottles of water”).  

### **4. Voice-Activated Search**  
✅ **Item Search** – Find specific items by brand, size, or price.  
✅ **Price Filtering** – Filter products using voice (e.g., “Find toothpaste under $5”).  

### **5. UI/UX**  
✅ **Minimalist Interface** – Clean, user-friendly shopping list display.  
✅ **Visual Feedback** – Displays real-time item recognition and actions.  
✅ **Mobile Optimization** – Designed for mobile and voice-first interactions.  

### **6. Hosting & Deployment**  
✅ **Backend:** Deployed on **Render**.  
✅ **Frontend:** Hosted on **Vercel**.  

---

## **Technology Stack**  

### **Frontend:**  
- ⚛️ **React.js** – Modular, scalable UI.  
- 🎤 **SpeechRecognition API** – Handles voice inputs.  
- 🎨 **CSS3 & Tailwind CSS** – Ensures responsive design.  

### **Backend:**  
- 🖥️ **Node.js & Express.js** – Server-side logic.  
- 🗄️ **MongoDB with Mongoose** – Database for persistent storage.  

---

## **Project Structure**  
```
Voice-Command-Shopping-Assistant/
│── backend/
│   ├── index.js
│   ├── routes.js
│   ├── models.js
│   ├── .env
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ShoppingList.js
│   │   │   ├── SmartSuggestions.js
│   │   │   ├── SpeechRecognition.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│── package.json
│── README.md
```  

---

## **Challenges & Solutions**  

🚀 **Speech Recognition for Different Words**  
✔ Improving recognition accuracy for varied voice inputs using **NLP enhancements**.  

⚠️ **Build Issues on Vercel**  
✔ Resolved by **fixing dependency conflicts** and clearing cache before deployment.  

🔄 **Smart Suggestions Logic**  
✔ Retained the **current logic** for suggesting products based on history & categories.  

---

## **Deployment Approach**  

### **Backend Deployment (Render)**  
1. **Configured** GitHub repository for **auto-deployment** on Render.  
2. **Connected** MongoDB Atlas for persistent storage.  
3. **Hosted** successfully with API endpoints.  

### **Frontend Deployment (Vercel)**  
1. **Imported** GitHub repository into Vercel.  
2. **Resolved build issues** by clearing cache and updating dependencies.  
3. **Successfully deployed** frontend for live interaction.  

---

## **Future Enhancements**  
🔹 **AI-Powered Smart Suggestions** – More accurate recommendations.  
🔹 **Multilingual Support** – Expand voice commands across multiple languages.  
🔹 **Dark Mode & UI Enhancements** – Improved user accessibility.  

---

## **Deliverables**  
✅ **Live URL:** [Voice Command Shopping Assistant](https://voice-command-shopping-assistant-xi2p.vercel.app)  
✅ **GitHub Repository:** [GitHub Link](#) (https://github.com/guptapreet/Voice-Command-Shopping-Assistant)  
✅ **Brief Approach Write-up:** (Below)  

---

The **Voice Command Shopping Assistant** is designed to simplify shopping list management through **voice input and smart recommendations**. The **frontend**, built with **React.js**, leverages the **Web Speech API** for real-time voice recognition, providing an intuitive **voice-first experience**. The **backend**, powered by **Node.js and Express.js**, handles API requests and integrates with **MongoDB** for persistent data storage.  

The **smart suggestion system** enhances usability by recommending items based on **shopping history, seasonal availability, and user preferences**. Items are **automatically categorized**, and users can **search/filter products using voice commands**.  

For deployment, the **backend is hosted on Render**, ensuring **scalability and reliability**, while the **frontend is deployed on Vercel** for a **fast and seamless user experience**. Challenges such as **speech recognition accuracy and build issues on Vercel** were tackled by **enhancing NLP processing** and **resolving dependency conflicts**.  
