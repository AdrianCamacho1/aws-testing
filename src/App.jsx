import React, { useState, useEffect } from "react";
import Form from "./components/Form";

function App() {
  const [apiStatus, setApiStatus] = useState(null);

  // Test the AWS connection on component mount
  useEffect(() => {
    const testApiConnection = async () => {
      try {
        console.log("Testing API connection...");
        
        // Simple GET request to test connection
        const response = await fetch('/api', {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        console.log("API test response status:", response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log("API test response data:", data);
          setApiStatus("connected");
        } else {
          const errorText = await response.text();
          console.error("API test error response:", errorText);
          setApiStatus("error");
        }
      } catch (error) {
        console.error("API connection test failed:", error);
        setApiStatus("failed");
      }
    };
    
    testApiConnection();
  }, []);

  return (
    <div className="App">
      <h1>My React App</h1>
      
      {apiStatus && (
        <div className={`api-status ${apiStatus}`} style={{
          padding: '10px', 
          margin: '10px 0', 
          borderRadius: '4px',
          backgroundColor: apiStatus === 'connected' ? '#d4edda' : '#f8d7da',
          color: apiStatus === 'connected' ? '#155724' : '#721c24'
        }}>
          <p>
            <strong>API Status:</strong> {apiStatus === 'connected' 
              ? 'Connected to AWS' 
              : 'Failed to connect to AWS API'}
          </p>
        </div>
      )}
      
      <p>Fill out the form below to submit your information:</p>
      <Form />
    </div>
  );
}

export default App;