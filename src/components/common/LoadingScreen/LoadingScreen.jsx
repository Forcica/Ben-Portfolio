import React from "react";
import { motion } from "framer-motion";
import "./LoadingScreen.css";

const LoadingScreen = ({ progress }) => {
	return (
		<motion.div
			className="loading-screen"
			initial={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1, ease: "easeInOut" }}
		>
			<div className="loading-content">
				<div className="loading-icon">
					<div className="circle"></div>
					<div className="circle"></div>
					<div className="circle"></div>
				</div>
				<div className="loading-progress">
					<div
						className="progress-bar"
						style={{ width: `${progress}%` }}
					></div>
				</div>
			</div>
		</motion.div>
	);
};

export default LoadingScreen;
