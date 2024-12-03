import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion, useAnimation, AnimatePresence, useScroll, useTransform } from "framer-motion";
import ProjectCard from "../../components/projects/Card/Card";
import { projects } from "../../data/projectsConfig";
import { HeroSection } from "../../components/sections/HeroSection/HeroSection";
import "./WebDev.css";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { SectionTransition } from "../../components/SectionTransition/SectionTransition";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import About from '../../components/sections/About/About';
import Contact from '../../components/sections/Contact/Contact';

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
	const controls = useAnimation();

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

	const [sectionsVisible, setSectionsVisible] = useState({
		about: false,
		contact: false
	});

	useEffect(() => {
		if (isHeroVisible) {
			controls.start("visible");
		}
		if (isProjectsVisible) {
			controls.start("visible");
		}
		if (isAboutVisible) {
			setSectionsVisible(prev => ({ ...prev, about: true }));
			controls.start("visible");
		}
		if (isContactVisible) {
			setSectionsVisible(prev => ({ ...prev, contact: true }));
			controls.start("visible");
		}
	}, [isHeroVisible, isProjectsVisible, isAboutVisible, isContactVisible, controls]);

	const filteredProjects = projects.filter((project) => {
		if (activeFilter === "Tous") return true;
		return project.categories.includes(activeFilter);
	});

	const handleFilterClick = (filter: string) => {
		setActiveFilter(filter);
	};

	const navigate = useNavigate();

	const ProjectModal = lazy(() => import('../../components/projects/Modal/Modal'));

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.5,
				when: "beforeChildren",
				staggerChildren: 0.1
			}
		}
	};

	return (
		<motion.div 
			className="webdev-container"
			initial="hidden"
			animate={controls}
			variants={containerVariants}
		>
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
							{sectionsVisible.about && <About />}
						</motion.div>
					</SectionTransition>

					<SectionTransition isVisible={isContactVisible}>
						<motion.div ref={contactRef} className="section">
							{sectionsVisible.contact && <Contact />}
						</motion.div>
					</SectionTransition>
				</div>
			</div>

			<Footer />

			<AnimatePresence>
				{selectedProject && (
					<Suspense fallback={
						<div className="section-loading">
							<div className="loading-spinner"></div>
						</div>
					}>
						<ProjectModal
							project={selectedProject}
							isOpen={!!selectedProject}
							onClose={() => setSelectedProject(null)}
						/>
					</Suspense>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default WebDev;
