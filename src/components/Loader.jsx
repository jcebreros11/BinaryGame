import '../styles/Loader.css';

function Loader({ fadeOut, text }) {
    return (
        <div className={`welcome-container ${fadeOut ? 'fade-out' : ''}`}>
            <div className="loader"></div>
            <h2 className="loading-text">{text}</h2>
        </div>
    );
}

export default Loader;