import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionTransitionProps {
	children: ReactNode;
	isVisible: boolean;
}

export const SectionTransition = ({ children, isVisible }: SectionTransitionProps) => {
	const variants = {
		hidden: { 
			opacity: 0,
			y: 20,
			transition: {
				duration: 0.3
			}
		},
		visible: { 
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: "easeOut"
			}
		}
	};

	return (
		<motion.div
			initial="visible"
			animate={isVisible ? "visible" : "hidden"}
			variants={variants}
			style={{ willChange: "opacity, transform" }}
		>
			{children}
		</motion.div>
	);
};
