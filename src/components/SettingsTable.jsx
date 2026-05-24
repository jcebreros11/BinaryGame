import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import '../styles/SettingsTable.css';

function SettingsTable() {
    const navigate = useNavigate();

    const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');
    const [isStarting, setIsStarting] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    const [customTime, setCustomTime] = useState(30);
    const [customMin, setCustomMin] = useState(0);
    const [customMax, setCustomMax] = useState(100);

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
        }, 2000);
    };

    const handleCustomSelect = () => {
        const difficulty = {
            level: 'Custom',
            time: Math.max(5, Number(customTime)),
            min: Math.max(0, Number(customMin)),
            max: Math.min(255, Number(customMax))
        };

        handleSelect(difficulty);
    };

    if (isStarting) {
        return <Loader fadeOut={fadeOut} text="Starting Game..." />;
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

                <div
                    className={`settings-card custom-card ${selectedDifficulty === 'Custom' ? 'selected' : ''}`}
                    onClick={() => setSelectedDifficulty('Custom')}
                >
                    <h3>Custom</h3>

                    <div className="custom-field">
                        <div className="slider-label">
                            <label>Time</label>
                            <span>{customTime}s</span>
                        </div>

                        <input
                            type="range"
                            min="5"
                            max="120"
                            value={customTime}
                            onChange={(e) => setCustomTime(Number(e.target.value))}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <div className="custom-field">
                        <div className="slider-label">
                            <label>Min</label>
                            <span>{customMin}</span>
                        </div>

                        <input
                            type="range"
                            min="0"
                            max="254"
                            value={customMin}
                            onChange={(e) => {
                                const newMin = Number(e.target.value);
                                setCustomMin(newMin);

                                if (customMax <= newMin) {
                                    setCustomMax(newMin + 1);
                                }
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <div className="custom-field">
                        <div className="slider-label">
                            <label>Max</label>
                            <span>{customMax}</span>
                        </div>

                        <input
                            type="range"
                            min={customMin + 1}
                            max="255"
                            value={customMax}
                            onChange={(e) => setCustomMax(Number(e.target.value))}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <button
                        className="custom-start-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCustomSelect();
                        }}
                    >
                        Start Custom
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SettingsTable;