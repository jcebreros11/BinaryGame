import { useState, useEffect } from 'react'
import ScoreBoard from './ScoreBoard';
import CountDown from './CountDown';
import '../styles/Binarygame.css'

function BinaryGame() {
    const min = 0;
    const max = 20;
    const randomBinary = () => {
        return Math.floor(min + Math.random() * (max + 1 - min)).toString(2);
    };

    const [binaryNumber, setBinaryNumber] = useState(undefined);
    const [answer, setAnswer] = useState(undefined);
    const [isCorrect, setIsCorrect] = useState(undefined);
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);

    useEffect(() => {
        setBinaryNumber(randomBinary());
    }, []);


    const handleChange = (input) => {
        setAnswer(input.target.value);
        setIsBtnDisabled(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = parseInt(answer).toString(2) === binaryNumber;
        setIsCorrect(isValid);
    }

    const generateNewNumber = () => {
        setBinaryNumber(randomBinary());
        setIsCorrect(undefined);
        setAnswer('');
        document.getElementById('answerInputId').value = "";
        setIsBtnDisabled(true);
    }


    return (
        <>
            <div className="binaryContainer">
                <h1 style={{ fontSize: '80px' }}>{binaryNumber}</h1>
                <div className="answer-form">
                    <form onSubmit={handleSubmit}>
                        <input id="answerInputId" type="number" onChange={handleChange} />
                        <button
                            id="submitBtnId"
                            type="submit"
                            disabled={isBtnDisabled}
                            style={{
                                backgroundColor: isBtnDisabled ? '#666' : 'green',
                                cursor: isBtnDisabled ? 'not-allowed' : 'pointer',
                            }}>
                            Submit
                        </button>
                    </form>
                </div>

                <div className="time-score">
                    <CountDown />
                    <ScoreBoard isCorrect={isCorrect} onNextRound={generateNewNumber} />
                </div>

            </div>
        </>
    )

}


export default BinaryGame;