import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';
import * as THREE from 'three';
import { loadGLTFAsync } from '../../../utils/loadGLTFAsync.js';

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
	const [isMobile, setIsMobile] = useState(false);
	const [progressValue, setProgressValue] = useState(0);
	const [loadingProgress, setLoadingProgress] = useState({
		model: 0,
		textures: 0
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
		}, 2000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const checkIsMobile = () => {
			setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
		};
		checkIsMobile();
		window.addEventListener('resize', checkIsMobile);
		return () => window.removeEventListener('resize', checkIsMobile);
	}, []);

	const loadModel = useCallback(async () => {
		const manager = new THREE.LoadingManager();
		
		manager.onProgress = (url, itemsLoaded, itemsTotal) => {
			const progress = (itemsLoaded / itemsTotal) * 100;
			
			if (url.includes('.gltf') || url.includes('.glb')) {
				setLoadingProgress(prev => ({ ...prev, model: progress }));
			} else if (url.includes('.jpg') || url.includes('.png')) {
				setLoadingProgress(prev => ({ ...prev, textures: progress }));
			}
			
			// Progrès global
			setProgressValue((loadingProgress.model + loadingProgress.textures) / 2);
		};

		manager.onError = (url) => {
			console.error(`Erreur lors du chargement: ${url}`);
		};

		try {
			const modelPath = isMobile ? 
				'/assets/models/scene-low.gltf' : 
				'/assets/models/scene-optimized.gltf';
			
			return await loadGLTFAsync(modelPath, manager);
		} catch (error) {
			console.error("Erreur lors du chargement du modèle:", error);
			throw error;
		}
	}, [isMobile]);

	const getOptimizedTexturePath = (originalPath: string) => {
		const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		const ext = originalPath.split('.').pop();
		const basePath = originalPath.replace(`.${ext}`, '');
		
		return isMobile 
			? `${basePath}-mobile.${ext}`
			: `${basePath}-optimized.${ext}`;
	};

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
							animate={{ scaleX: progressValue / 100 }}
							transition={{ duration: 0.3 }}
						/>
					</div>
					<span className="progress-text">{Math.floor(progressValue)}%</span>
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
