import React, { useState } from "react";

export default function MyComponent() {
  const [file, setFile] = useState(null);
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleField1Change = (event) => {
    setField1(event.target.value);
  };

  const handleField2Change = (event) => {
    setField2(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("field1", field1);
    formData.append("field2", field2);

    // Send form data to the server
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the server response
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>File:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <label>Field 1:</label>
          <input type="text" value={field1} onChange={handleField1Change} />
        </div>
        <div>
          <label>Field 2:</label>
          <input type="text" value={field2} onChange={handleField2Change} />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
