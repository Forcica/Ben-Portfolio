import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./LevelDesign.css";

const LevelDesign = () => {
	const navigate = useNavigate();

	return (
		<motion.div
			className="level-design-container"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<div className="construction-message">
				<h1>🎮 En cours de création</h1>
				<p>
					Cette section est actuellement en développement.
					<br />
					Revenez bientôt pour découvrir mes projets de level design !
				</p>
				<motion.button
					className="return-button"
					onClick={() => navigate("/")}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					Retour à l'accueil
				</motion.button>
			</div>
		</motion.div>
	);
};

export default LevelDesign;
