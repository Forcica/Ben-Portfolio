import { motion } from "framer-motion";
import "./SectionTransition.css";

export const SectionTransition = ({ 
	children, 
	isVisible 
}: { 
	children: React.ReactNode;
	isVisible: boolean;
}) => {
	const sectionVariants = {
		hidden: {
			opacity: 0,
			y: 30,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 1,
				ease: [0.43, 0.13, 0.23, 0.96],
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	const decorativeVariants = {
		hidden: { scaleX: 0 },
		visible: {
			scaleX: 1,
			transition: {
				duration: 1.2,
				ease: [0.43, 0.13, 0.23, 0.96],
			},
		},
	};

	return (
		<div className={`section-transition ${isVisible ? "visible" : ""}`}>
			<motion.div
				className="decorative-line left"
				variants={decorativeVariants}
				initial="hidden"
				animate={isVisible ? "visible" : "hidden"}
			/>
			<motion.div
				className="decorative-line right"
				variants={decorativeVariants}
				initial="hidden"
				animate={isVisible ? "visible" : "hidden"}
			/>

			<motion.div
				className="section-content"
				variants={sectionVariants}
				initial="hidden"
				animate={isVisible ? "visible" : "hidden"}
				viewport={{ once: true, margin: "-100px" }}
			>
				{children}
			</motion.div>
		</div>
	);
};
