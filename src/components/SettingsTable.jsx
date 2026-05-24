import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import '../styles/SettingsTable.css';

function SettingsTable() {

    const navigate = useNavigate();

    const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');
    const [isStarting, setIsStarting] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    const difficulties = [
        { level: 'Easy', time: 45, min: 0, max: 50 },
        { level: 'Medium', time: 30, min: 0, max: 100 },
        { level: 'Hard', time: 20, min: 0, max: 200 }
    ];

    const handleSelect = (difficulty) => {
        setSelectedDifficulty(difficulty.level);
        setIsStarting(true);

        setTimeout(() => {
            setFadeOut(true);
        }, 1500);

        setTimeout(() => {
            navigate('/game', {
                state: { difficulty }
            });
        }, 1000);
    };

    if (isStarting) {
        return (
            <Loader
                fadeOut={fadeOut}
                text="Starting Game..."
            />
        );
    }

    return (
        <div className="settings-container">
            <h2 className="settings-title">Select Difficulty</h2>

            <div className="settings-grid">
                {difficulties.map((difficulty) => (
                    <div
                        key={difficulty.level}
                        className={`settings-card ${selectedDifficulty === difficulty.level ? 'selected' : ''}`}
                        onClick={() => handleSelect(difficulty)}
                    >
                        <h3>{difficulty.level}</h3>

                        <div className="setting-row">
                            <span>Time</span>
                            <span>{difficulty.time}s</span>
                        </div>

                        <div className="setting-row">
                            <span>Range</span>
                            <span>{difficulty.min} - {difficulty.max}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SettingsTable;