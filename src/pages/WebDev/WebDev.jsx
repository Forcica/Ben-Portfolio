import React, { useState, useEffect } from "react";
import {
	motion,
	AnimatePresence,
	useScroll,
	useTransform,
} from "framer-motion";
import ProjectCard from "../../components/projects/Card/Card";
import ProjectModal from "../../components/projects/Modal/Modal";
import { projects } from "../../data/projectsConfig";
import { HeroSection } from "../../components/sections/HeroSection/HeroSection";
import About from "../../components/sections/About/About";
import Contact from "../../components/sections/Contact/Contact";
import "./WebDev.css";

const WebDev = () => {
	const [selectedProject, setSelectedProject] = useState(null);
	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], [0, -25]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	return (
		<>
			<motion.div style={{ opacity: isLoading ? 0 : 1 }}>
				<div className="webdev-container">
					<div className="decorative-elements">
						<div className="zen-circle"></div>
						<div className="decorative-circle circle-1"></div>
						<div className="decorative-circle circle-2"></div>
					</div>

					<HeroSection />

					<motion.section className="projects-section">
						<h2 className="section-title">
							プロジェクト
							<span className="title-translation">Projets</span>
						</h2>
						<motion.div
							className="projects-grid"
							initial={{ opacity: 0 }}
							whileInView={{
								opacity: 1,
								transition: {
									staggerChildren: 0.2,
									delayChildren: 0.3,
								},
							}}
							viewport={{ once: true, margin: "-100px" }}
							style={{ y }}
						>
							{projects.map((project, index) => (
								<ProjectCard
									key={project.id}
									project={project}
									onSelect={setSelectedProject}
									index={index}
								/>
							))}
						</motion.div>
					</motion.section>

					<About />
					<Contact />
				</div>

				<AnimatePresence>
					{selectedProject && (
						<ProjectModal
							project={selectedProject}
							isOpen={!!selectedProject}
							onClose={() => setSelectedProject(null)}
						/>
					)}
				</AnimatePresence>
			</motion.div>
		</>
	);
};

export default WebDev;
