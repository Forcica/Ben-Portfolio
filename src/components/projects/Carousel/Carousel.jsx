import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "./Carousel.css";

const ProjectCarousel = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handlePrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		);
	};

	return (
		<div className="carousel-container">
			<AnimatePresence mode="wait">
				<motion.img
					key={currentIndex}
					src={images[currentIndex]}
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -100 }}
					transition={{ duration: 0.3 }}
					className="carousel-image"
				/>
			</AnimatePresence>

			{images.length > 1 && (
				<>
					<button
						className="carousel-button prev"
						onClick={handlePrevious}
						aria-label="Image précédente"
					>
						<ChevronLeft color="white" size={24} />
					</button>
					<button
						className="carousel-button next"
						onClick={handleNext}
						aria-label="Image suivante"
					>
						<ChevronRight color="white" size={24} />
					</button>
				</>
			)}
		</div>
	);
};

export default ProjectCarousel;
