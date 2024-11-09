import React from "react";
import { motion } from "framer-motion";
import "./About.css";

const skillsData = [
	{
		category: "Frontend",
		skills: ["React", "Vue.js", "Three.js", "GSAP", "TypeScript"],
	},
	{
		category: "Backend",
		skills: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
	},
	{
		category: "Autres",
		skills: ["Git", "Docker", "AWS", "Figma"],
	},
];

const About = () => {
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
		hidden: { opacity: 0, x: -20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.8,
				ease: [0.43, 0.13, 0.23, 0.96],
			},
		},
		hover: {
			scale: 1.02,
			color: "var(--accent)",
			transition: {
				duration: 0.3,
				ease: "easeInOut",
			},
		},
	};

	const hoverVariants = {
		rest: { scale: 1 },
		hover: {
			scale: 1.05,
			transition: {
				duration: 0.3,
				ease: "easeInOut",
			},
		},
	};

	const skillCategoryVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.1,
				duration: 0.8,
				ease: [0.43, 0.13, 0.23, 0.96],
			},
		}),
		hover: {
			y: -5,
			scale: 1.02,
			transition: {
				duration: 0.3,
				ease: "easeInOut",
			},
		},
	};

	return (
		<motion.section
			className="about-section"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-100px" }}
			variants={containerVariants}
		>
			<div className="kanji-background">技</div>
			<motion.div className="about-content">
				<h2 className="about-title">
					私について
					<span className="title-translation">À propos</span>
				</h2>

				<div className="about-grid">
					<motion.div
						className="about-text-container"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
					>
						<div className="about-text">
							{[
								{
									emphasis: "開発者",
									text: "Développeur web passionné par la création d'expériences numériques uniques et innovantes.",
								},
								{
									emphasis: "専門家",
									text: "Spécialisé en React, Three.js et développement full-stack, je combine créativité et expertise technique.",
								},
							].map((item, index) => (
								<motion.p
									key={index}
									className="about-paragraph"
									variants={textVariants}
								>
									<motion.span
										className="emphasis"
										variants={textVariants}
									>
										{item.emphasis}
									</motion.span>
									{item.text}
								</motion.p>
							))}

							<motion.p
								className="about-philosophy"
								variants={textVariants}
							>
								<motion.span
									className="japanese-quote"
									variants={textVariants}
								>
									「完璧を目指して」
								</motion.span>
								<motion.span
									className="quote-translation"
									variants={textVariants}
								>
									En quête de perfection dans chaque projet
								</motion.span>
							</motion.p>
						</div>
					</motion.div>

					<div className="skills-container">
						<div className="skills-grid">
							{skillsData.map((category, idx) => (
								<motion.div
									key={category.category}
									className="skill-category"
									custom={idx}
									initial="rest"
									whileInView="visible"
									whileHover="hover"
									variants={skillCategoryVariants}
								>
									<h3 className="category-title">
										{category.category}
										<span className="category-decoration">・</span>
									</h3>
									<div className="skill-tags">
										{category.skills.map((skill, index) => (
											<motion.span
												className="skill-tag"
												key={skill}
												custom={index}
												whileHover="hover"
												initial="rest"
												variants={hoverVariants}
											>
												{skill}
											</motion.span>
										))}
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</motion.div>
		</motion.section>
	);
};

export default About;
