import React, { useState } from "react";
import axios from "axios";
import "./plant.css";
import AyuLogo from "../../assets/images/AyuLogo.png";
import cartbg from "../../assets/images/cartbg.jpg"; // Replace 'backgroundImage.jpg' with your image file path

function Identification() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    setLoading(true); // Set loading to true when submission starts

    try {
      const response = await axios.post(
        "http://localhost:5714/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Set the result in the state
      setResult(response.data.result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false when submission finishes
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${cartbg})`,
          backgroundSize: "cover",
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          className="plant-title"
          style={{
            color: "white",
            fontSize: "6vw",
            marginBottom: "20px",
            marginTop: "50px",
          }}
        >
          Identify &nbsp; your &nbsp; Plant&nbsp;
        </h1>
        <div
          className="bg-customGreen plant-container mb-16"
          style={{
            padding: "65px",
            borderRadius: "2px",
            boxShadow: "0px 10px 50px rgba(147, 184, 159, 0)",
            backgroundColor: "rgba(255,255,255, 0.4)",
          }}
        >
          <h2 className="plant-desc mb-3"> Select your image below</h2>
          <input
            type="file"
            id="file" // Added id attribute
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          <label htmlFor="file" className="custom-file-upload mx-10 my-4">
            Choose File
          </label>
          <button
            onClick={handleSubmit}
            className="custom-file-upload mx-10 my-4"
            disabled={loading} // Disable the button when loading is true
          >
            {loading ? "Loading..." : "Upload"}{" "}
            {/* Show Loading or Upload based on loading state */}
          </button>
          {result && <p className="custom-font">{result}</p>}{" "}
          {/* Display result if available */}
        </div>
      </div>
    </>
  );
}

export default Identification;
