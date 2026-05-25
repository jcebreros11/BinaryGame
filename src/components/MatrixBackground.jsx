import '../styles/MatrixBackground.css';

function MatrixBackground() {
    const columns = Array.from({ length: 40 });

    return (
        <div className="matrix-background">
            {columns.map((_, index) => (
                <span
                    key={index}
                    className="matrix-column"
                    style={{
                        left: `${index * 2.5}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${6 + Math.random() * 8}s`
                    }}
                >
                    01010110100101101001011010010110
                </span>
            ))}
        </div>
    );
}

export default MatrixBackground;