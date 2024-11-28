import React from "react";
import { motion } from "framer-motion";
import "./LoadingScreen.css";

const LoadingScreen = ({ progress }) => {
	return (
		<motion.div
			className="loading-screen"
			initial={{ opacity: 1 }}
			exit={{
				opacity: 0,
				transition: {
					duration: 0.8,
					ease: [0.43, 0.13, 0.23, 0.96],
				},
			}}
		>
			<motion.div className="loading-content">
				<motion.div
					className="loading-icon"
					animate={{
						scale: [1, 1.1, 1],
						rotate: [0, 180, 360],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "linear",
					}}
				>
					<div className="circle"></div>
					<div className="circle"></div>
					<div className="circle"></div>
				</motion.div>
				<motion.div className="loading-progress">
					<motion.div
						className="progress-bar"
						initial={{ width: 0 }}
						animate={{ width: `${progress}%` }}
						transition={{ duration: 0.3 }}
					/>
				</motion.div>
				<motion.span
					className="progress-text"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					{Math.round(progress)}%
				</motion.span>
			</motion.div>
		</motion.div>
	);
};

export default LoadingScreen;
