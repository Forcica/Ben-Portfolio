import React from "react";
import { motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import ProjectCarousel from "../Carousel/Carousel";
import "./Modal.css";

const ProjectModal = ({ project, isOpen, onClose }) => {
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
					<h2 className="modal-title">{project.title}</h2>
					<p className="modal-subtitle">{project.description}</p>

					<div className="modal-categories">
						{project.categories.map((category, index) => (
							<span key={index} className="category-tag">
								{category}
							</span>
						))}
					</div>

					<div className="modal-section">
						<h3 className="section-title">Technologies</h3>
						<div className="modal-tags">
							{project.technologies.map((tech, index) => (
								<span key={index} className="tag">
									{tech}
								</span>
							))}
						</div>
					</div>

					<div className="modal-description">
						{project.longDescription
							.split("\n")
							.map((paragraph, index) => (
								<p key={index}>{paragraph}</p>
							))}
					</div>

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
				</div>
			</motion.div>
		</motion.div>
	);
};

export default ProjectModal;
