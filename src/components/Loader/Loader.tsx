import React from 'react';
import './loader.css';

const Loader: React.FC = () => {
    return (
        <div className="loader-wrapper">
            <div className="socket">
                <div className="gel center-gel">
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </div>

                {/* All gel blocks (unchanged) */}
                {[...Array(37)].map((_, index) => {
                    const classNum = index + 1;
                    if (classNum === 27) return null; // skip c27 (not in original)
                    return (
                        <div key={classNum} className={`gel c${classNum} r${getRow(classNum)}`}>
                            <div className="hex-brick h1"></div>
                            <div className="hex-brick h2"></div>
                            <div className="hex-brick h3"></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Helper to assign rows (based on your original structure)
function getRow(n: number): 1 | 2 | 3 {
    if (n >= 1 && n <= 6) return 1;
    if (n >= 7 && n <= 18) return 2;
    return 3;
}

export default Loader;
