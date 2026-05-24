import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import '../styles/Welcome.css'

function Welcome() {
    const navigate = useNavigate();
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 1500);

        const navTimer = setTimeout(() => {
            navigate('/settings');
        }, 2000);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(navTimer);
        };

    }, [navigate]);


    return <Loader
        fadeOut={fadeOut}
        text="Initializing Game..."
    />;

}

export default Welcome;