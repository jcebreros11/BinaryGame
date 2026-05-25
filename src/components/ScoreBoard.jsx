import { useState, useEffect } from 'react'
import '../styles/ScoreBoard.css'



function ScoreBoard({ score, isCorrect, onNextRound, isTimeOut, correctAns, resetTrigger }) {
    const [points, setPoints] = useState(score);
    const [showCorrectAns, setShowCorrectAns] = useState(false);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        setShowCorrectAns(true);
    }, [isTimeOut]);


    useEffect(() => {
        setPoints(0);
        setStreak(0);
        setShowCorrectAns(false);
    }, [resetTrigger]);


    useEffect(() => {
        if (isCorrect === true) {
            setPoints(prevScore => prevScore + 1);
            setStreak(prevStreak => prevStreak + 1);

            const timer = setTimeout(() => {
                onNextRound();
            }, 1000);

            return () => clearTimeout(timer);
        }

        if (isCorrect === false) {
            setStreak(0);
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
                <h3>Score: {points}</h3>
            </div>
            {
                streak >= 3 && (
                    <div>
                        <h3>Streak 🔥: {streak}</h3>
                    </div>
                )
            }

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