import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import "./HeroSection.css";

const skills = [
	{
		name: "React & Next.js",
		icon: "⚛️",
		color: "#61DAFB",
		description: "Applications web & E-commerce",
		link: "/projects/react",
	},
	{
		name: "Three.js & WebGL",
		icon: "🎨",
		color: "#000000",
		description: "Expériences 3D immersives",
		link: "/projects/3d",
	},
	{
		name: "SEO & Performance",
		icon: "📈",
		color: "#990000",
		description: "Optimisation & Conversion",
		link: "/projects/seo",
	},
	{
		name: "Creative Dev",
		icon: "🌟",
		color: "#9B2C2C",
		description: "Solutions innovantes",
		link: "/projects/creative",
	},
];

const scrollTexts = [
	"applications performantes",
	"expériences 3D",
	"sites e-commerce",
	"interfaces créatives",
	"solutions sur mesure",
];

const WaveAnimation = () => (
	<motion.div className="wave-container">
		{[...Array(3)].map((_, i) => (
			<motion.div
				key={i}
				className="wave"
				initial={{
					scale: 0.8,
					opacity: 0.2,
					borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%",
				}}
				animate={{
					scale: [0.8, 1.1, 0.8],
					opacity: [0.2, 0.4, 0.2],
					borderRadius: [
						"40% 60% 60% 40% / 40% 40% 60% 60%",
						"60% 40% 40% 60% / 60% 60% 40% 40%",
						"40% 60% 60% 40% / 40% 40% 60% 60%",
					],
				}}
				transition={{
					duration: 6,
					delay: i * 2,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>
		))}
	</motion.div>
);

export const HeroSection = () => {
	return (
		<motion.div className="hero-section">
			<div className="hero-background">
				<motion.div
					className="zen-pattern"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 0.03, scale: 1 }}
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
						sequence={scrollTexts}
						wrapper="span"
						speed={50}
						className="animated-text"
						repeat={Infinity}
					/>
				</div>

				<WaveAnimation />

				<motion.div className="skills-container">
					{skills.map((skill, index) => (
						<motion.div
							key={skill.name}
							className="skill-badge"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.2 }}
							whileHover={{
								y: -5,
								scale: 1.02,
								backgroundColor: `${skill.color}15`,
							}}
						>
							<span className="skill-icon">{skill.icon}</span>
							<div className="skill-content">
								<span className="skill-name">{skill.name}</span>
								<span className="skill-description">
									{skill.description}
								</span>
							</div>
						</motion.div>
					))}
				</motion.div>
			</motion.div>
		</motion.div>
	);
};
