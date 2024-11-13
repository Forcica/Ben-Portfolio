import React, { useState, useRef } from "react";
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
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { SectionTransition } from "../../components/SectionTransition/SectionTransition";

const WebDev = () => {
	const [selectedProject, setSelectedProject] = useState(null);
	const [activeFilter, setActiveFilter] = useState("Tous");
	const { scrollYProgress } = useScroll();
	const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

	const heroRef = useRef(null);
	const projectsRef = useRef(null);
	const aboutRef = useRef(null);
	const contactRef = useRef(null);

	const isHeroVisible = useIntersectionObserver(heroRef);
	const isProjectsVisible = useIntersectionObserver(projectsRef);
	const isAboutVisible = useIntersectionObserver(aboutRef);
	const isContactVisible = useIntersectionObserver(contactRef);

	const filteredProjects = projects.filter((project) => {
		if (activeFilter === "Tous") return true;
		return project.categories.includes(activeFilter);
	});

	const handleFilterClick = (filter) => {
		setActiveFilter(filter);
	};

	return (
		<div className="webdev-container">
			<div className="sections-wrapper">
				<motion.div
					className="decorative-elements"
					style={{ y: backgroundY }}
				>
					<div className="zen-circle"></div>
					<div className="decorative-circle circle-1"></div>
					<div className="decorative-circle circle-2"></div>
				</motion.div>

				<div className="sections-container">
					<SectionTransition isVisible={isHeroVisible}>
						<motion.div ref={heroRef} className="section">
							<HeroSection />
						</motion.div>
					</SectionTransition>

					<SectionTransition isVisible={isProjectsVisible}>
						<motion.section
							ref={projectsRef}
							className="section projects-section"
						>
							<h2 className="section-title">
								プロジェクト
								<span className="title-translation">Projets</span>
							</h2>

							<div className="projects-filters">
								<motion.button
									className={`filter-btn ${
										activeFilter === "Tous" ? "active" : ""
									}`}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => handleFilterClick("Tous")}
								>
									Tous
								</motion.button>
								{["Frontend", "3D", "Creative", "Full-Stack"].map(
									(filter) => (
										<motion.button
											key={filter}
											className={`filter-btn ${
												activeFilter === filter ? "active" : ""
											}`}
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
											onClick={() => handleFilterClick(filter)}
										>
											{filter}
										</motion.button>
									)
								)}
							</div>

							<div className="projects-grid">
								{filteredProjects.map((project, index) => (
									<ProjectCard
										key={project.id}
										project={project}
										onSelect={setSelectedProject}
										index={index}
									/>
								))}
							</div>
						</motion.section>
					</SectionTransition>

					<SectionTransition isVisible={isAboutVisible}>
						<motion.div ref={aboutRef} className="section">
							<About />
						</motion.div>
					</SectionTransition>

					<SectionTransition isVisible={isContactVisible}>
						<motion.div ref={contactRef} className="section">
							<Contact />
						</motion.div>
					</SectionTransition>
				</div>
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
		</div>
	);
};

export default WebDev;
