import { useEffect, useRef } from "react";
import "./Cursor.css";

const Cursor = () => {
	const dotRef = useRef<HTMLDivElement | null>(null);
	const outlineRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		document.body.style.cursor = 'none';

		const updateCursor = (e: MouseEvent) => {
			const { clientX, clientY } = e;

			if (dotRef.current) {
				dotRef.current.style.transform = `translate3d(${clientX - 3}px, ${
					clientY - 3
				}px, 0)`;
			}

			if (outlineRef.current) {
				outlineRef.current.style.transform = `translate3d(${
					clientX - 16
				}px, ${clientY - 16}px, 0)`;
			}
		};

		const addHoverClass = () => {
			outlineRef.current?.classList.add("cursor-hover");
		};

		const removeHoverClass = () => {
			outlineRef.current?.classList.remove("cursor-hover");
		};

		let rafId: number | null = null;
		const smoothUpdateCursor = (e: MouseEvent) => {
			if (rafId) {
				cancelAnimationFrame(rafId);
			}
			rafId = requestAnimationFrame(() => updateCursor(e));
		};

		document.addEventListener("mousemove", smoothUpdateCursor);

		const interactiveElements = document.querySelectorAll(
			"a, button, .project-card, input, textarea"
		);

		interactiveElements.forEach((el) => {
			el.addEventListener("mouseenter", addHoverClass);
			el.addEventListener("mouseleave", removeHoverClass);
		});

		return () => {
			document.removeEventListener("mousemove", smoothUpdateCursor);
			if (rafId) {
				cancelAnimationFrame(rafId);
			}
			interactiveElements.forEach((el) => {
				el.removeEventListener("mouseenter", addHoverClass);
				el.removeEventListener("mouseleave", removeHoverClass);
			});
		};
	}, []);

	return (
		<>
			<div ref={dotRef} className="cursor-dot" />
			<div ref={outlineRef} className="cursor-outline" />
		</>
	);
};

export default Cursor;
