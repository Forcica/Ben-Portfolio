import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import "./Card.css";
import { Project } from '../../../pages/WebDev/WebDev';

interface ProjectCardProps {
	project: Project;
	onSelect: (project: Project) => void;
	index: number;
}

const cardVariants = {
	hidden: {
		opacity: 0,
		y: 50,
		rotateX: -5,
	},
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		rotateX: 0,
		transition: {
			delay: i * 0.1,
			duration: 1,
			ease: [0.43, 0.13, 0.23, 0.96],
		},
	}),
};

const ProjectCard = ({ project, onSelect, index }: ProjectCardProps) => {
	return (
		<motion.div
			className="project-card"
			custom={index}
			initial="hidden"
			
			animate="visible"
			variants={cardVariants}
			whileHover={{
				scale: 1.02,
				rotate: 0,
				y: -10,
				boxShadow: "0 20px 30px rgba(0,0,0,0.2)",
			}}
			onClick={() => onSelect(project)}
		>
			<div className="project-image">
				<img src={project.images[0]} alt={project.title} />
			</div>

			<div className="project-content">
				<h3 className="project-title">{project.title}</h3>
				<p className="project-description">{project.description}</p>

				<div className="project-tags">
					{project.tags.map((tag, i) => (
						<span key={i} className="project-tag">
							{tag}
						</span>
					))}
				</div>

				<div className="project-link">
					Voir le projet
					<ChevronRight className="ml-1" />
				</div>
			</div>
		</motion.div>
	);
};

export default ProjectCard;
