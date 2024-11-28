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

const WaveAnimation = () => (
	<motion.div className="wave-container">
		<motion.div
			className="wave"
			style={{
				opacity: 0.03,
				transform: "scale(0.8)",
			}}
		/>
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
						sequence={[
							"applications performantes",
							4000,
							"expériences 3D",
							4000,
							"sites e-commerce",
							4000,
							"interfaces créatives",
							4000,
							"solutions sur mesure",
							4000,
						]}
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
