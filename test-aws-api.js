// Save this as test-aws-api.js and run with Node.js
// npm install node-fetch
// node test-aws-api.js

import fetch from 'node-fetch';

async function testAwsApi() {
  try {
    console.log('Testing direct connection to AWS API Gateway...');
    
    const response = await fetch('https://q6ge4tj1fl.execute-api.us-east-2.amazonaws.com/dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message'
      })
    });
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Success response:', data);
    } else {
      const errorText = await response.text();
      console.error('Error response:', errorText);
    }
  } catch (error) {
    console.error('Request failed:', error);
  }
}

testAwsApi();