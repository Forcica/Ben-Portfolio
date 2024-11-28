import { motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import ProjectCarousel from "../Carousel/Carousel";
import "./Modal.css";

// Définition de l'interface pour les props du projet
interface Project {
	title: string;
	description: string;
	longDescription: string;
	images: string[];
	technologies: string[];
	categories: string[];
	github?: string;
	live?: string;
}

// Props du composant Modal
interface ProjectModalProps {
	project: Project;
	isOpen: boolean;
	onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
	if (!isOpen) return null;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={onClose}
			className="modal-overlay"
		>
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
				onClick={(e) => e.stopPropagation()}
				className="modal-content"
			>
				<button onClick={onClose} className="modal-close-button">
					<X size={20} />
				</button>

				<ProjectCarousel images={project.images} />

				<div className="modal-body">
					<div className="modal-main-content">
						<h2 className="modal-title">{project.title}</h2>
						<p className="modal-subtitle">{project.description}</p>

						<div className="results-section">
							{project.longDescription
								.split("\n")
								.map((paragraph: string, index) => {
									if (paragraph.includes("•")) {
										const [title, ...items] = paragraph.split("•");
										return (
											<div key={index}>
												<h3>{title.trim()}</h3>
												<ul className="results-list">
													{items.map((item, i) => (
														<li key={i}>{item.trim()}</li>
													))}
												</ul>
											</div>
										);
									}
									return <p key={index}>{paragraph.trim()}</p>;
								})}
						</div>
					</div>

					<div className="modal-sidebar">
						<div className="technologies-section">
							<h3>Technologies</h3>
							<div className="technologies-container">
								{project.technologies.map((tech, index) => (
									<span key={index} className="technology-tag">
										{tech}
									</span>
								))}
							</div>
						</div>

						<div className="category-section">
							<h3>Catégorie</h3>
							<div className="category-tags">
								{project.categories.map((category, index) => (
									<span key={index} className="category-tag">
										{category}
									</span>
								))}
							</div>
						</div>

						{(project.github || project.live) && (
							<div className="modal-links">
								{project.github && (
									<a
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										className="modal-link"
									>
										GitHub
										<ExternalLink size={16} />
									</a>
								)}
								{project.live && (
									<a
										href={project.live}
										target="_blank"
										rel="noopener noreferrer"
										className="modal-link modal-link-live"
									>
										Voir le site
										<ExternalLink size={16} />
									</a>
								)}
							</div>
						)}
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default ProjectModal;
