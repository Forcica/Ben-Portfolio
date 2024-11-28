import { motion } from "framer-motion";
import "./About.css";

const skillsData = [
	{
		category: "React Expertise",
		skills: [
			"React.js",
			"Next.js",
			"TypeScript",
			"Redux Toolkit",
			"React Query",
		],
	},
	{
		category: "3D & Creative",
		skills: [
			"Three.js",
			"React Three Fiber",
			"WebGL",
			"GLSL Shaders",
			"3D Animation",
		],
	},
	{
		category: "E-commerce & SEO",
		skills: [
			"Shopify",
			"WooCommerce",
			"SEO Technique",
			"Performance Web",
			"Analytics",
		],
	},
	{
		category: "Development Tools",
		skills: ["Git", "Testing", "CI/CD", "Clean Code", "Responsive Design"],
	},
];

const About = () => {
	const aboutTexts = [
		{
			kanji: "開発者",
			text: "Je m'appelle Benoît, j'ai 24 ans et je vis en France. Développeur web, je travaille sur des projets variés en fonction des besoins.",
		},
		{
			kanji: "専門家",
			text: "Je réalise des sites vitrines, des boutiques en ligne, et des applications interactives. J'ai aussi de l'expérience dans la création de contenus 3D immersifs avec Three.js et WebGL.",
		},
		{
			kanji: "創造者",
			text: "Mon objectif est de livrer des solutions fiables et performantes, avec une navigation fluide et un design soigné pour une meilleure expérience utilisateur.",
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
		visible: (i: number) => ({
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
