import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const response = await fetch("https://your-api-id.execute-api.your-region.amazonaws.com/form-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus("Submission successful!");
        setFormData({ name: "", email: "", message: "" }); // Reset form after success
      } else {
        setStatus("Error: Could not submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("Network error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Submit Your Information</h2>
      
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
        style={inputStyle}
      />
      
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        required
        style={inputStyle}
      />
      
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your Message"
        rows="5"
        required
        style={textareaStyle}
      />
      
      <button type="submit" style={buttonStyle}>Submit</button>
      <p>{status}</p>
    </form>
  );
};

// Inline styles for simplicity (you can also use CSS or styled-components)
const formStyle = {
  maxWidth: "600px",
  margin: "2rem auto",
  padding: "1.5rem",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  marginTop: "1rem",
  boxSizing: "border-box"
};

const textareaStyle = {
  ...inputStyle,
  minHeight: "120px"
};

const buttonStyle = {
  marginTop: "1rem",
  padding: "0.75rem 1.5rem",
  backgroundColor: "#007acc",
  color: "white",
  border: "none",
  cursor: "pointer"
};

export default Form;
