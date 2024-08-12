import React, { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(":8000/name", {
        name: name,
      });
      setResult(`Response: ${response.data.resp}`);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult("Error fetching data");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Enter Your Name</h1>
      <input
        type="text"
        value={name}
        onChange={handleInputChange}
        placeholder="Your Name"
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: "10px 20px", fontSize: "16px", marginLeft: "10px" }}
      >
        Submit
      </button>
      {result && (
        <p style={{ marginTop: "20px", fontSize: "18px" }}>{result}</p>
      )}
    </div>
  );
}

export default App;
