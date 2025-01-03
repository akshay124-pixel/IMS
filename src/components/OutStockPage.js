import React, { useState, useEffect } from "react";
import axios from "axios";

function OutStockPage() {
  const [stockName, setStockName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [stockData, setStockData] = useState([]);

  // Fetch stock data from the backend
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/stocks");
        setStockData(response.data);
      } catch (error) {
        setErrorMessage("Failed to load stock data.");
      }
    };

    fetchStockData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stock = stockData.find((item) => item.stockName === stockName);

    if (!stock) {
      setErrorMessage("Stock not found.");
      return;
    }

    if (parseInt(quantity) > stock.quantity) {
      setErrorMessage("Cannot issue more stock than available.");
      return;
    }

    try {
      setErrorMessage(""); // Clear any previous error messages

      // Send request to backend
      const response = await axios.post("http://localhost:4000/api/out", {
        stockName,
        quantity,
        recipientName,
        purpose,
        dateOfIssue,
      });

      if (response.data.message === "Stock issued successfully") {
        setSuccessMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("Error occurred while processing the request.");
    }

    // Reset form fields
    setStockName("");
    setQuantity("");
    setRecipientName("");
    setPurpose("");
    setDateOfIssue("");
  };

  return (
    <div
      style={{
        padding: "40px 20px",
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h1
        style={{
          background: "linear-gradient(90deg, #6a11cb, #2575fc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "flex",
          justifyContent: "center",
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "bold",
        }}
      >
        Out Stock Form
      </h1>

      {/* Error Message */}
      {errorMessage && (
        <div
          style={{
            backgroundColor: "#f87171",
            color: "#fff",
            padding: "10px 15px",
            borderRadius: "8px",
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: "500",
            width: "80%",
            maxWidth: "500px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div
          style={{
            backgroundColor: "#34d399",
            color: "#fff",
            padding: "10px 15px",
            borderRadius: "8px",
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: "500",
            width: "80%",
            maxWidth: "500px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {successMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          width: "90%",
          maxWidth: "600px",
          backgroundColor: "#fff",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {[
          {
            label: "Stock Name",
            value: stockName,
            onChange: setStockName,
            id: "stockName",
            type: "text",
            options: stockData.map((item) => item.stockName),
          },
          {
            label: "Quantity",
            value: quantity,
            onChange: setQuantity,
            id: "quantity",
            type: "number",
          },
          {
            label: "Recipient/Customer Name",
            value: recipientName,
            onChange: setRecipientName,
            id: "recipientName",
            type: "text",
          },
          {
            label: "Purpose",
            value: purpose,
            onChange: setPurpose,
            id: "purpose",
            type: "text",
          },
          {
            label: "Date of Issue",
            value: dateOfIssue,
            onChange: setDateOfIssue,
            id: "dateOfIssue",
            type: "date",
          },
        ].map(({ label, value, onChange, id, type, options }) => (
          <div style={{ marginBottom: "20px" }} key={id}>
            <label
              htmlFor={id}
              style={{
                fontSize: "1rem",
                color: "#4b5563",
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              {label}
            </label>
            {options ? (
              <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "1rem",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
              >
                <option value="">Select Stock</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  fontSize: "1rem",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          style={{
            padding: "12px 25px",
            background: "linear-gradient(135deg, #2575fc, #6a11cb)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.2rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "block",
            margin: "20px auto 0",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#2563eb")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#3b82f6")}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default OutStockPage;
