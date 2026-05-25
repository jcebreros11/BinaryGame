import { useState, useEffect } from 'react';
import '../styles/CountDown.css';

function CountDown({ onTimeOut, resetTrigger, secs }) {
    const [countDown, setCountDown] = useState(secs);
    const [isTimeUp, setIsTimeUp] = useState(false);

    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const progress = countDown / secs;
    const strokeDashoffset = circumference * (1 - progress);

    useEffect(() => {
        setCountDown(secs);
        setIsTimeUp(false);
    }, [resetTrigger, secs]);

    useEffect(() => {
        if (isTimeUp) return;

        if (countDown === 0) {
            setIsTimeUp(true);
            onTimeOut();
            return;
        }

        const timer = setTimeout(() => {
            setCountDown(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countDown, isTimeUp, onTimeOut]);

    return (
        <div className="timer-wrapper">
            <div className="circle-timer">
                <svg width="75" height="75">
                    <circle
                        className="timer-bg"
                        cx="37.5"
                        cy="37.5"
                        r={radius}
                    />

                    <circle
                        className="timer-progress"
                        cx="37.5"
                        cy="37.5"
                        r={radius}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                    />
                </svg>

                <div className="timer-text">
                    {isTimeUp ? '0' : countDown}
                </div>
            </div>

            {isTimeUp && <h3 className="time-up-text">Time&apos;s Up!</h3>}
        </div>
    );
}

export default CountDown;