import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import "./HeroSection.css";

const skills = [
	{ name: "React", icon: "⚛️", color: "#61DAFB" },
	{ name: "Three.js", icon: "🎨", color: "#000000" },
	{ name: "WebGL", icon: "✨", color: "#990000" },
	{ name: "Creative Dev", icon: "🌟", color: "#9B2C2C" },
];

const scrollTexts = [
	"expériences immersives",
	"interfaces élégantes",
	"animations fluides",
	"expériences 3D",
	"sites performants",
];

export const HeroSection = () => {
	return (
		<motion.div className="hero-section">
			<div className="hero-background">
				<motion.div
					className="zen-pattern"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 0.03, scale: 1 }}
					transition={{ duration: 2 }}
				/>
				<motion.div className="kanji-overlay">創造</motion.div>
			</div>

			<motion.div
				className="hero-content"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 0.3 }}
			>
				<h1 className="hero-title">
					Développeur Frontend Créatif
					<span className="hero-title-jp">フロントエンド開発者</span>
				</h1>

				<div className="hero-subtitle">
					<TypeAnimation
						sequence={scrollTexts.reduce(
							(acc, text) => [...acc, text, 3000],
							[]
						)}
						wrapper="span"
						speed={50}
						className="animated-text"
						repeat={Infinity}
					/>
				</div>

				<motion.div className="skills-container">
					{skills.map((skill, index) => (
						<motion.div
							key={skill.name}
							className="skill-badge"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.1 + 0.8 }}
							whileHover={{
								y: -5,
								backgroundColor: `${skill.color}10`,
								boxShadow: `0 10px 20px ${skill.color}15`,
							}}
						>
							<span className="skill-icon">{skill.icon}</span>
							<span className="skill-name">{skill.name}</span>
						</motion.div>
					))}
				</motion.div>
			</motion.div>
		</motion.div>
	);
};
