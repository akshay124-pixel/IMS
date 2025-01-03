import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function EntryPage() {
  // State to manage form input values
  const [formData, setFormData] = useState({
    stockName: "",
    description: "",
    quantity: "",
    supplierName: "",
    category: "",
    pricePerUnit: "",
  });

  // State to manage error and success messages
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation for quantity
    if (formData.quantity <= 0) {
      setMessage("Quantity must be greater than 0");
      setMessageType("error");
      return;
    }

    try {
      // Sending POST request to the backend
      const response = await axios.post(
        "https://imserver.onrender.com/api/add", // Ensure port matches backend server
        formData,
        {
          withCredentials: true,
        }
      );

      // Handle successful response
      if (response.status === 200 || response.status === 201) {
        setMessage("Stock added successfully!");
        setMessageType("success");

        // Reset form data
        setFormData({
          stockName: "",
          description: "",
          quantity: "",
          supplierName: "",
          category: "",
          pricePerUnit: "",
        });
      } else {
        // Handle unexpected status codes
        setMessage(
          `Unexpected Response: ${response.statusText || "Unknown issue"}`
        );
        setMessageType("error");
      }
    } catch (error) {
      // Handle different error scenarios
      if (error.response) {
        // Error response from server
        console.error("Server Response Error:", error.response.data);
        setMessage(
          `Server Error: ${error.response.data.message || "An error occurred"}`
        );
      } else if (error.request) {
        // Request made but no response received
        console.error("Request Error (No Response):", error.request);
        setMessage(
          "Request Error: No response from server. Please check your connection or server."
        );
      } else {
        // Unexpected errors during setup or execution
        console.error("Unexpected Error:", error.message);
        setMessage(`Unexpected Error: ${error.message}`);
      }
      setMessageType("error");
    }
  };

  return (
    <div className="entry-page">
      <div className="form-container">
        <h2
          className="form-title"
          style={{
            background: "linear-gradient(90deg, #6a11cb, #2575fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "flex",
            justifyContent: "center",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Add New Stock
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Stock Name
            </label>
            <input
              type="text"
              name="stockName"
              value={formData.stockName}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter stock name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter description"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="form-input"
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Supplier Name
            </label>
            <input
              type="text"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter supplier name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter category"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: "bold" }}>
              Price per Unit
            </label>
            <input
              type="number"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <button type="submit" className="submit-button">
              Add Stock
            </button>
          </div>
        </form>

        {message && (
          <div
            className={`message ${
              messageType === "success" ? "success" : "error"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default EntryPage;
