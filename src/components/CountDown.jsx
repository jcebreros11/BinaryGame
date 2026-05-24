import { useState, useEffect } from 'react'
import '../styles/CountDown.css'


function CountDown({ onTimeOut, resetTrigger }) {

    const [countDown, setCountDown] = useState(20);
    const [isTimeUp, setIsTimeUp] = useState(false);

    useEffect(() => {
        setCountDown(20);
        setIsTimeUp(false);
    }, [resetTrigger]);


    useEffect(() => {
        if (isTimeUp) return;

        const timer = setTimeout(() => {
            setCountDown(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countDown, isTimeUp]);


    useEffect(() => {
        if (countDown === 0) {
            setIsTimeUp(true);
            onTimeOut();
        }
    }, [countDown]);

    return (
        <>
            <div className="time-container">
                {
                    isTimeUp ? <h3>Times Up!</h3> : <h3>Timer ⏰: {countDown}</h3>
                }
            </div>
        </>
    )
}

export default CountDown;