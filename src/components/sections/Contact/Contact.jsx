import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Contact.css";

// Service d'envoi d'email
const sendEmail = async (data) => {
	try {
		const response = await fetch("/api/contact", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error("Erreur lors de l'envoi");
		}

		return await response.json();
	} catch (error) {
		throw new Error("Erreur de communication avec le serveur");
	}
};

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [status, setStatus] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus("sending");
		setError("");

		try {
			await sendEmail(formData);
			setStatus("success");
			setFormData({ name: "", email: "", message: "" });
		} catch (error) {
			setStatus("error");
			setError(error.message);
		}
	};

	return (
		<section id="contact" className="contact-section">
			<motion.div
				className="contact-content"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
			>
				<h2 className="contact-title">
					連絡
					<span className="title-translation">Contact</span>
				</h2>
				<form onSubmit={handleSubmit} className="contact-form">
					<div className="form-group">
						<input
							type="text"
							placeholder="Votre nom"
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							required
						/>
					</div>
					<div className="form-group">
						<input
							type="email"
							placeholder="Votre email"
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							required
						/>
					</div>
					<div className="form-group">
						<textarea
							placeholder="Votre message"
							value={formData.message}
							onChange={(e) =>
								setFormData({ ...formData, message: e.target.value })
							}
							required
						/>
					</div>
					<button
						type="submit"
						className={`submit-button ${status}`}
						disabled={status === "sending"}
					>
						{status === "sending" ? "Envoi en cours..." : "Envoyer"}
					</button>
					{status === "success" && (
						<p className="success-message">
							Message envoyé avec succès !
						</p>
					)}
					{status === "error" && (
						<p className="error-message">
							{error || "Une erreur est survenue"}
						</p>
					)}
				</form>
			</motion.div>
		</section>
	);
};

export default Contact;
