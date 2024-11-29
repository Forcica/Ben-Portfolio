import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

interface LoadingScreenProps {
	progress: number;
}

const loadingMessages = [
	"Création de l'univers...",
	"Chargement des éléments 3D...",
	"Configuration des shaders...",
	"Préparation de l'expérience..."
];

const LoadingScreen = ({ progress }: LoadingScreenProps) => {
	const [messageIndex, setMessageIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
		}, 2000);
		return () => clearInterval(interval);
	}, []);

	return (
		<motion.div 
			className="loading-screen"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="loading-content">
				<h1 className="loading-title">創造中...</h1>
				<div className="loading-progress-container">
					<div className="loading-progress">
						<motion.div 
							className="progress-bar"
							initial={{ scaleX: 0 }}
							animate={{ scaleX: progress / 100 }}
							transition={{ duration: 0.3 }}
						/>
					</div>
					<span className="progress-text">{Math.floor(progress)}%</span>
				</div>
				<AnimatePresence mode="wait">
					<motion.p
						key={messageIndex}
						className="loading-message"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5 }}
					>
						{loadingMessages[messageIndex]}
					</motion.p>
				</AnimatePresence>
			</div>
		</motion.div>
	);
};

export default LoadingScreen;
