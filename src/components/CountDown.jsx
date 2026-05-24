import { useState, useEffect } from 'react'
import '../styles/CountDown.css'


function CountDown() {

    const [countDown, setCountDown] = useState(30);
    const [isTimeUp, setIsTimeUp] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setCountDown(countDown - 1);
        }, 1000);
    });

    useEffect(() => {
        if (countDown === 0) {
            setIsTimeUp(true);
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