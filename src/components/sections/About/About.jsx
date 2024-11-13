import React from "react";
import { motion } from "framer-motion";
import "./About.css";

const skillsData = [
	{
		category: "3D & Creative Development",
		skills: [
			"Three.js",
			"React Three Fiber",
			"WebGL",
			"GLSL Shaders",
			"3D Animation",
		],
	},
	{
		category: "Frontend Expertise",
		skills: [
			"React.js",
			"Next.js",
			"TypeScript",
			"Framer Motion",
			"State Management",
		],
	},
	{
		category: "Creative Tools",
		skills: [
			"GSAP",
			"Blender",
			"WebGL Shaders",
			"Creative Coding",
			"Motion Design",
		],
	},
	{
		category: "Development Tools",
		skills: [
			"Git",
			"Performance",
			"Clean Code",
			"Testing",
			"Responsive Design",
		],
	},
];

const About = () => {
	const aboutTexts = [
		{
			kanji: "開発者",
			text: "Développeur frontend spécialisé dans la création d'expériences web immersives. Je combine expertise technique et créativité pour transformer des concepts complexes en interfaces intuitives et engageantes. Mon approche est centrée sur l'innovation et l'expérience utilisateur.",
		},
		{
			kanji: "専門家",
			text: "Expert en développement 3D et WebGL avec 5 ans d'expérience. Maîtrisant React, Three.js et les shaders GLSL, je crée des expériences web uniques qui repoussent les limites du web moderne. Spécialisé dans l'optimisation des performances et l'accessibilité.",
		},
		{
			kanji: "創造者",
			text: "Passionné par le creative coding et l'innovation, je développe des solutions sur mesure qui allient performance technique et design innovant. Mon expertise en motion design et en animations 3D permet de créer des interfaces mémorables qui captivent les utilisateurs.",
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.3,
			},
		},
	};

	const textVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: [0.43, 0.13, 0.23, 0.96],
			},
		},
	};

	const skillVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.1,
				duration: 0.4,
				ease: [0.43, 0.13, 0.23, 0.96],
			},
		}),
	};

	return (
		<motion.section
			className="about-section"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-100px" }}
			variants={containerVariants}
		>
			<motion.h2 className="about-title" variants={textVariants}>
				私について
				<span className="title-translation">À propos</span>
			</motion.h2>

			<div className="about-content">
				<motion.div className="about-text-container">
					{aboutTexts.map((item, index) => (
						<motion.div
							key={index}
							className="about-text-item"
							variants={textVariants}
						>
							<span className="kanji">{item.kanji}</span>
							<p className="text">{item.text}</p>
						</motion.div>
					))}
				</motion.div>

				<motion.div className="skills-grid">
					{skillsData.map((category, idx) => (
						<motion.div
							key={category.category}
							className="skill-section"
							variants={skillVariants}
							custom={idx}
							whileHover={{
								y: -4,
								transition: { duration: 0.2 },
								boxShadow: "0 10px 30px rgba(155, 44, 44, 0.1)",
							}}
						>
							<h3 className="skill-category-title">
								{category.category}
							</h3>
							<div className="skill-tags">
								{category.skills.map((skill) => (
									<motion.span
										key={skill}
										className="skill-tag"
										whileHover={{
											scale: 1.05,
											backgroundColor: "rgba(155, 44, 44, 0.06)",
										}}
									>
										{skill}
									</motion.span>
								))}
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</motion.section>
	);
};

export default About;
