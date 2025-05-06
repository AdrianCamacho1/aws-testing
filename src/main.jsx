import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Add this code temporarily to your main.jsx to verify the actual AWS URL
console.log("AWS API URL Verification:");
try {
  // Test a direct fetch to the AWS API
  fetch('https://q6ge4tj1fl.execute-api.us-east-2.amazonaws.com/dev', {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    console.log("Direct AWS API response status:", response.status);
    return response.text();
  })
  .then(text => {
    console.log("Direct AWS API response:", text);
  })
  .catch(error => {
    console.error("Direct AWS API error:", error);
  });
} catch (e) {
  console.error("Failed to verify AWS URL:", e);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
