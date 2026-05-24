import { useState, useEffect } from 'react'
import '../styles/ScoreBoard.css'



function ScoreBoard({ isCorrect, onNextRound }) {
    const [score, setScore] = useState(0);


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
            <div>
                <h3>Score: {score}</h3>
            </div>
            <div className="score-container" style={{ display: isCorrect !== undefined ? 'block' : 'none' }}>
                {
                    isCorrect ?
                        <h2 id="correct">Correct! ✅</h2>
                        : <h2 id="incorrect">Incorrect! ❌</h2>
                }
            </div>
        </>
    )

}


export default ScoreBoard;