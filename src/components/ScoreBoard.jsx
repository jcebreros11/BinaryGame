import { useState, useEffect } from 'react'
import '../styles/ScoreBoard.css'



function ScoreBoard({ score, isCorrect, onNextRound, isTimeOut, correctAns, resetTrigger }) {
    const [points, setPoints] = useState(score);
    const [showCorrectAns, setShowCorrectAns] = useState(false);
    const [streak, setStreak] = useState(0);
    const [showStreakBurst, setShowStreakBurst] = useState(false);

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
            setPoints(score);
            setStreak(prevStreak => prevStreak + 1);

            if (streak >= 3) {
                setShowStreakBurst(true);

                setTimeout(() => {
                    setShowStreakBurst(false);
                }, 900);
            }

            const timer = setTimeout(() => {
                onNextRound();
            }, 1000);

            return () => clearTimeout(timer);
        }

        if (isCorrect === false) {
            setStreak(0);
        }
    }, [isCorrect]);

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

            {showStreakBurst && (
                <div className="streak-burst">
                    🔥 STREAK x{streak + 1}
                </div>
            )}

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