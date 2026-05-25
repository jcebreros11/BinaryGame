import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import ScoreBoard from '../components/ScoreBoard';
import CountDown from '../components/CountDown';
import '../styles/BinaryGame.css'
import vibrationUtils from '../utils/vibrationUtils';

function getBaseLog(base, arg) {
    return Math.log(arg) / Math.log(base);
}


function formatBinaryNum(shortBinaryNumber) {
    
    
    let binNumCharArr = [];
    let binNum = parseInt(shortBinaryNumber, 2);
    
    if (binNum == 0) {
        return "00000000";
    } else if (binNum == 1){
        return "00000001";
    }


    let byteSize = Math.ceil(getBaseLog(256, binNum));
    do {
        if (binNum % 2 == 0) {
            binNumCharArr.push('0');
        } else {
            binNumCharArr.push('1');
        }
        binNum >>= 1; // Next bit position
    } while (binNum > 0);

    let bitsToFill = (byteSize * 8) - binNumCharArr.length;
    for (bitsToFill; bitsToFill > 0; bitsToFill--){
        binNumCharArr.push('0');
    }

    let binNumString = binNumCharArr.reverse().join("");
    return binNumString;

}


function BinaryGame() {
    const navigate = useNavigate();
    const location = useLocation();
    const difficulty = location.state?.difficulty;
    const min = difficulty?.min ?? 0;
    const max = difficulty?.max ?? 20;
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
    const { vibrate } = vibrationUtils();
    const [displayBinary, setDisplayBinary] = useState('');

    useEffect(() => {
        setBinaryNumber(randomBinary());
    }, []);

    useEffect(() => {
        if (!binaryNumber) return;

        setDisplayBinary('');
        let index = 0;

        const interval = setInterval(() => {
            setDisplayBinary(
                binaryNumber.slice(0, index + 1)
            );

            index++;

            if (index >= binaryNumber.length) {
                clearInterval(interval);
            }

        }, 120);

        return () => clearInterval(interval);

    }, [binaryNumber]);


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
                vibrate(80);
                setResetTimer(prev => prev + 1);
            } else {
                vibrate([120, 80, 120]);
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
        vibrate([200, 100, 200]);
        setIsCorrect(undefined);
        setIsBtnDisabled(true);
        setIsTimeOut(true);
        document.getElementById('answerInputId').value = "";
    }

    const handleSettingsClick = () => {
        navigate('/settings');
    };

    return (
        <>
            <button
                className="settings-icon-btn"
                onClick={handleSettingsClick}
                title="Change difficulty"
            >
                ⚙️
            </button>

            <div className="binaryContainer">
                <h1 id="binaryNumber" key={binaryNumber}>
                    {binaryNumber}
                </h1>
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
                        secs={difficulty.time}
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