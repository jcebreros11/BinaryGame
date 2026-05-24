import { useState, useEffect } from 'react'
import ScoreBoard from './ScoreBoard';
import CountDown from './CountDown';
import '../styles/BinaryGame.css'

function BinaryGame() {
    const min = 0;
    const max = 100;
    const randomBinary = () => {
        return Math.floor(min + Math.random() * (max + 1 - min)).toString(2);
    };

    const [binaryNumber, setBinaryNumber] = useState(undefined);
    const [answer, setAnswer] = useState(undefined);
    const [isCorrect, setIsCorrect] = useState(undefined);
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);
    const [isTimeOut, setIsTimeOut] = useState(false);
    const [resetTimer, setResetTimer] = useState(0);
    const [resetScore, setResetScore] = useState(0);

    useEffect(() => {
        setBinaryNumber(randomBinary());
    }, []);


    const handleChange = (input) => {
        setAnswer(input.target.value);
        setIsBtnDisabled(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const isSubmit = e.nativeEvent.submitter.id === 'submitBtnId' ? true : false;

        if (isSubmit) {
            const isValid = parseInt(answer).toString(2) === binaryNumber;
            setIsCorrect(isValid);

            if (isValid) {
                setResetTimer(prev => prev + 1);
            }
        } else {
            generateNewNumber();
            setIsTimeOut(false);
            setResetTimer(prev => prev + 1);
            setResetScore(prev => prev + 1);

        }
    }

    const generateNewNumber = () => {
        setBinaryNumber(randomBinary());
        setIsCorrect(undefined);
        setAnswer('');
        document.getElementById('answerInputId').value = "";
        setIsBtnDisabled(true);
    }

    const handleTimeout = () => {
        setIsCorrect(undefined);
        setIsBtnDisabled(true);
        setIsTimeOut(true);
        document.getElementById('answerInputId').value = "";
    }


    return (
        <>
            <div className="binaryContainer">
                <h1 id="binaryNumber">{binaryNumber}</h1>
                <div className="answer-form">
                    <form onSubmit={handleSubmit}>
                        <div className="userInput">
                            <input id="answerInputId" type="number" onChange={handleChange} disabled={isTimeOut} />
                            {
                                !isTimeOut ?
                                    <button
                                        id="submitBtnId"
                                        className="btnAct"
                                        type="submit"
                                        disabled={isBtnDisabled}
                                        style={{
                                            backgroundColor: isBtnDisabled ? '#666' : 'green',
                                            cursor: isBtnDisabled ? 'not-allowed' : 'pointer',
                                        }}>
                                        Submit
                                    </button> :
                                    <button
                                        id="restartBtnId"
                                        className="btnAct"
                                        type="submit"
                                        style={{
                                            backgroundColor: 'green',
                                            cursor: 'pointer',
                                        }}>
                                        Restart
                                    </button>
                            }
                        </div>
                    </form>
                </div >

                <div className="time-score">
                    <CountDown
                        onTimeOut={handleTimeout}
                        resetTrigger={resetTimer}
                        isCorrect={isCorrect}
                    />
                    <ScoreBoard isCorrect={isCorrect}
                        onNextRound={generateNewNumber}
                        isTimeOut={isTimeOut}
                        correctAns={parseInt(binaryNumber, 2)}
                        resetTrigger={resetScore} />
                </div>

            </div >
        </>
    )

}


export default BinaryGame;