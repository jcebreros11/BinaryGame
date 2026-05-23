import { useState, useEffect } from 'react'
import './styles/App.css'

function App() {

  const min = 0; 
  const max = 16;
  const randomBinary = () => {
      return Math.floor(min + Math.random() * (max + 1 - min)).toString(2);
  };



  const [binaryNumber, setBinaryNumber] = useState(undefined);
  const [answer, setAnswer] = useState(undefined); 
  const [isCorrect, setIsCorrect] = useState(undefined); 
  const [countDown, setCountDown] = useState(5); 

  useEffect(() => {
    setBinaryNumber(randomBinary());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setCountDown(countDown-1);
    }, 1000);   
  });

  useEffect(() => {
    if(countDown === 0){
      alert("Times Up!");
    }
  }, [countDown]);

  const handleChange = (input) => {
    setAnswer(input.target.value);
  }

    const handleSubmit = () => {
      const isValid =  parseInt(answer).toString(2) === binaryNumber;
      setIsCorrect(isValid);
  }

  useEffect(() => {
    if(isCorrect){
      setBinaryNumber(randomBinary());
      //setIsCorrect(undefined);

    }

  }, [isCorrect])

  return (
    <>
      <div className="container"><h1>BinaryGame</h1>
        <div className="binaryContainer"><h2>{binaryNumber}</h2></div>
        <form>
          <label>Answer:</label>
          <input type="number" onChange={handleChange}/>
        </form>
        <button
					type="button"
          disabled = {answer === undefined ? true : false}
					onClick={handleSubmit}>
            Submit
				</button>
      </div>
      <div style={{ display: isCorrect !== undefined ? 'block' : 'none' }}>
        {isCorrect? 
          <h2>Correct</h2> 
          : <h2>Wrong</h2> 
        }
      </div>

    </>
  )
}

export default App
