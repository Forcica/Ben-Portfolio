import { useEffect, useState } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
	progress: number;
}

const LoadingScreen = ({ progress }: LoadingScreenProps) => {
	const [fadeOut, setFadeOut] = useState(false);

	useEffect(() => {
		if (progress >= 100) {
			setTimeout(() => setFadeOut(true), 500);
		}
	}, [progress]);

	return (
		<div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
			<div className="loading-content">
				<div className="loading-icon">
					<div className="circle"></div>
					<div className="circle"></div>
					<div className="circle"></div>
				</div>
				<div className="loading-progress">
					<div className="progress-bar" style={{ width: `${progress}%` }}></div>
				</div>
			</div>
		</div>
	);
};

export default LoadingScreen;
