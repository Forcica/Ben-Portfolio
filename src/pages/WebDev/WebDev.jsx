import React, { useState } from "react";
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
import "./WebDev.css";

const WebDev = () => {
	const [selectedProject, setSelectedProject] = useState(null);
	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], [0, -25]);
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="webdev-container"
		>
			<HeroSection />

			<motion.div style={{ y }} className="projects-section">
				<h2 className="webdev-title">Mes Projets</h2>
				<motion.div
					className="projects-grid"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.8 }}
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
			</motion.div>
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
	);
};

export default WebDev;
