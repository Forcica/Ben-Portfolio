import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import "./HeroSection.css";

const scrollTexts = [
	"expériences interactives",
	"interfaces élégantes",
	"solutions innovantes",
	"applications performantes",
	"designs créatifs",
];

export const HeroSection = () => {
	return (
		<motion.div
			className="hero-section"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
		>
			<motion.h1
				className="hero-title"
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2, duration: 0.8 }}
			>
				Développeur Web Créatif
			</motion.h1>
			<motion.div
				className="hero-subtitle"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5 }}
			>
				<span className="hero-text">Transformant des idées en</span>
				<TypeAnimation
					sequence={scrollTexts.reduce(
						(acc, text) => [...acc, text, 10000],
						[]
					)}
					wrapper="span"
					speed={50}
					repeat={Infinity}
					className="hero-animated-text"
				/>
			</motion.div>
		</motion.div>
	);
};
