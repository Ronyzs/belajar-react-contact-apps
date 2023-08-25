import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot function from react-dom/client

// Component imports
import App from './components/App'; // Main application component

// Import styles
import './styles/style.css'; // Import CSS styles

// Create a root for rendering the application
const root = createRoot(document.getElementById('root')); // Get the root DOM element
root.render(<App />); // Render the main App component into the root element