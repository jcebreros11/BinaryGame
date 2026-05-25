// src/components/GameOverModal.jsx
import '../styles/GameOverModal.css';

function GameOverModal({ score, correctAns, onPlayAgain, onChangeDifficulty }) {
    return (
        <div className="modal-backdrop">
            <div className="game-over-modal">
                <h2>GAME OVER</h2>

                <p>Final Score: {score}</p>
                <p>Correct Answer: {correctAns}</p>

                <div className="modal-actions">
                    <button onClick={onPlayAgain}>
                        Play Again
                    </button>

                    <button onClick={onChangeDifficulty}>
                        Change Difficulty
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GameOverModal;