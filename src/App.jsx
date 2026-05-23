import { useState } from 'react'
import './App.css'

function App() {

  const min = 0; 
  const max = 255;
  const temp = 0;
  const randomBinary = () => {
      temp = Math.floor(min + Math.random() * (max + 1 - min)).toString(2);
      return temp;
  };
 
  const [binaryNumber, setBinaryNumber] = useState(randomBinary());
  const [answer, setAnswer] = useState(); 

  const handleChange = (input) => {
    setAnswer(input.target.value);
    console.log(input.target.value);
  }

    const handleSubmit = () => {
        answer = answer.toString(2);
        if (answer == temp) {
            console.log("Right")
        } else {
            console.log("Wrong")
        }
    return null;
  }

  return (
    <>
      <div><h1>BinaryGame</h1></div>
      <div><h2>{binaryNumber}</h2></div>
      <form>
        <label>Answer:</label>
        <input type="text" onChange={handleChange}/>
      </form>
      <button
					type="button"
					onClick={handleSubmit}>
            Submit
				</button>
    </>
  )
}

export default App
