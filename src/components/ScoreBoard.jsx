import { useState, useEffect } from 'react'
import '../styles/ScoreBoard.css'



function ScoreBoard({ isCorrect, onNextRound, isTimeOut, correctAns, resetTrigger }) {
    const [score, setScore] = useState(0);
    const [showCorrectAns, setShowCorrectAns] = useState(false);

    useEffect(() => {
        setShowCorrectAns(true);
    }, [isTimeOut]);


    useEffect(() => {
        setScore(0);
        setShowCorrectAns(false);
    }, [resetTrigger]);


    useEffect(() => {
        if (isCorrect) {
            setScore(prevScore => prevScore + 1);
            setTimeout(() => {
                onNextRound();
            }, 1000);
        }
    }, [isCorrect, onNextRound]);

    return (
        <>
            {
                showCorrectAns === true && (
                    <div id="correctAns">
                        <h3> Correct Answer: {correctAns}</h3>
                    </div>
                )
            }
            <div>
                <h3>Score: {score}</h3>
            </div>
            <div className="score-container" style={{ display: isCorrect !== undefined ? 'block' : 'none' }}>
                {
                    isCorrect ?
                        <h3 id="correct">Correct! ✅</h3>
                        : <h3 id="incorrect">Incorrect! ❌</h3>
                }
            </div>
        </>
    )

}


export default ScoreBoard;