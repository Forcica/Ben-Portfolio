import { useState, useRef, lazy, Suspense } from "react";
import {
	motion,
	AnimatePresence,
	useScroll,
	useTransform,
} from "framer-motion";
import ProjectCard from "../../components/projects/Card/Card";
import { projects } from "../../data/projectsConfig";
import { HeroSection } from "../../components/sections/HeroSection/HeroSection";
import "./WebDev.css";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { SectionTransition } from "../../components/SectionTransition/SectionTransition";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";

export interface Project {
	id: number;
	title: string;
	categories: string[];
	images: string[];
	description: string;
	tags: string[];
	longDescription: string;
	technologies: string[];
	// ... autres propriétés
}

const WebDev = () => {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

	const handleFilterClick = (filter: string) => {
		setActiveFilter(filter);
	};

	const navigate = useNavigate();

	const ProjectModal = lazy(() => import('../../components/projects/Modal/Modal'));
	const About = lazy(() => import('../../components/sections/About/About'));
	const Contact = lazy(() => import('../../components/sections/Contact/Contact'));

	const sections = [
		document.querySelector('.hero-section'),
		document.querySelector('.projects-section'),
		document.querySelector('.about-section'),
		document.querySelector('.contact-section')
	].filter(section => section !== null);

	sections.forEach(section => {
		if (section) {
		}
	});

	return (
		<div className="webdev-container">
			<Navbar />
			<motion.button
				className="home-return-button"
				onClick={() => navigate("/")}
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				← Accueil
			</motion.button>
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
								{["Frontend", "3D", "Creative", "Landing Page"].map(
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
										onSelect={(project: Project) => setSelectedProject(project)}
										index={index}
									/>
								))}
							</div>
						</motion.section>
					</SectionTransition>

					<SectionTransition isVisible={isAboutVisible}>
						<motion.div ref={aboutRef} className="section">
							<Suspense fallback={<div>Loading...</div>}>
								<About />
							</Suspense>
						</motion.div>
					</SectionTransition>

					<SectionTransition isVisible={isContactVisible}>
						<motion.div ref={contactRef} className="section">
							<Suspense fallback={<div>Loading...</div>}>
								<Contact />
							</Suspense>
						</motion.div>
					</SectionTransition>
				</div>
			</div>

			<Footer />

			<AnimatePresence>
				{selectedProject && (
					<Suspense fallback={<div>Loading...</div>}>
						<ProjectModal
							project={selectedProject}
							isOpen={!!selectedProject}
							onClose={() => setSelectedProject(null)}
						/>
					</Suspense>
				)}
			</AnimatePresence>
		</div>
	);
};

export default WebDev;
