import React, { useState } from 'react';

function App() {
  const [image, setImage] = useState("");
  const [imagePath, setImagePath] = useState("");
  // const [caption, setCaption] = useState("");
  const [display, setDisplay] = useState(0);
  const [cars, setCars] = useState([]);

  function submitImage(event) {
    event.preventDefault();
    const imageName = event.target.image.files[0].name;

    // Get Image name "x.png"
    setImage(imageName);
    setImagePath(`../public/${imageName}`);

    // Send image name to node.js AI
    fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageName }),
    })
    .then(response => {
    if (response.ok) {
      console.log('Image path sent to the server successfully');
      return response.json(); // Parse the JSON response
    } else {
      throw new Error('Failed to send image path to the server');
    }
    })
    .then(data => {
      console.log(data); 
      setCars(data);
      setDisplay(1);
    })
    .catch(error => {
      console.error('Error sending image path to the server:', error);
    });
  }
  
  return (
    <div>
      <img className="logo" src="../public/logo.png"/>
      <h1 className="header">AI Vision Image Analysis (Azure)</h1>
      {/* Submit Button */}
      <form onSubmit={submitImage} encType="multipart/form-data">
        <input type="file" name="image" accept="image/*"/>
        <button type="submit">Upload Image</button>
      </form>
      <div className="carImages">
        <h3>Matched Cars: </h3>
        {cars.map((car, index) => (
          <div>
            <img key={index} src={`../public/${car.model}.png`} alt={`Image ${index + 1}`} />
            <p>{`${car.year} ${car.model}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
