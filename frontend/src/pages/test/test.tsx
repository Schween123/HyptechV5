import React, { useState, useEffect } from 'react';

const Test: React.FC = () => {
  const [billAmount, setBillAmount] = useState(0); // State to store the bill amount
  const [isReading, setIsReading] = useState(false); // State to track if reading is enabled
  const [readingStarted, setReadingStarted] = useState(false); // Track if the reading process has started

  // Function to start reading from the bill acceptor
  const startReading = () => {
    setIsReading(true);
    setReadingStarted(true);
  };

  // Fetch bill value from backend periodically and update the total amount
  useEffect(() => {
    if (isReading) {
      const interval = setInterval(async () => {
        try {
          const response = await fetch('http://localhost:8000/api/bill-acceptor/');
          const data = await response.json();
          if (data.bill_value && data.bill_value > 0) {
            setBillAmount(prevAmount => prevAmount + data.bill_value);
            setIsReading(false); // Automatically stop reading after a bill is detected
          }
        } catch (error) {
          console.error("Error fetching bill amount:", error);
        }
      }, 1000); // Fetch every 1 second

      return () => clearInterval(interval); // Clean up the interval on component unmount or when reading stops
    }
  }, [isReading]);

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Value"
        value={`₱ ${billAmount.toFixed(2)}`}
        style={styles.textBox}
        readOnly
      />
      <div style={styles.buttonContainer}>
        <button onClick={startReading} style={styles.button} disabled={isReading || readingStarted}>
          Start Reading
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height to center the text box vertically
    flexDirection: 'column', // Optional, in case you want to add more items
  },
  textBox: {
    padding: '10px',
    fontSize: '16px',
    width: '300px', // Adjust the width as needed
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '20px', // Add some margin below the text box
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px', // Space between the buttons
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    cursor: 'pointer',
  },
};

export default Test;
