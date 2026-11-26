"use client";

import { createLink } from "@/services/linkService";
import { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

export default function Home() {
	const [url, setUrl] = useState("");
	const [code, setCode] = useState("");
	const [newLink, setNewLink] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const copyTimer = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage("");
		setIsLoading(true);
		setNewLink(null);

		try {
			const createdLink = await createLink(url, code);
			setNewLink(createdLink);
			setUrl("");
			setCode("");
		} catch (error) {
			setErrorMessage(error.message);
		}
		setIsLoading(false);
	};
	const shortLink = newLink
		? `${process.env.NEXT_PUBLIC_BASE_URL}/${newLink.code}`
		: "";

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(shortLink);
			setIsCopied(true);
			clearTimeout(copyTimer.current);
			copyTimer.current = setTimeout(() => setIsCopied(false), 2000);
		} catch (error) {
			setErrorMessage("Could not copy the link. Please copy it manually.");
		}
	};
	return (
		<section className="hero text-center">
			<span className="hero-pill fade-up">
				<span className="status-dot"></span>
				Free link shortener
			</span>

			<h1 className="hero-title fade-up delay-1">
				Make long links <span className="text-gradient">short</span>
			</h1>
			<p className="lead-muted mx-auto fade-up delay-2">
				Paste a long link and get a short address that is easy to share.
			</p>

			<Form onSubmit={handleSubmit} className="shorten-form fade-up delay-3">
				<Form.Label htmlFor="url" visuallyHidden>
					Long URL
				</Form.Label>
				<div className="shorten-bar">
					<Form.Control
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						id="url"
						type="text"
						size="lg"
						placeholder="https://example.com/some/very/long/link"
					/>
					<Button
						disabled={isLoading}
						type="submit"
						size="lg"
						className="shorten-btn"
					>
						{isLoading && (
							<Spinner animation="border" size="sm" className="me-2" />
						)}
						{isLoading ? "Shortening..." : "Shorten"}
					</Button>
				</div>

				<div className="code-field">
					<Form.Label htmlFor="code" className="code-label">
						Custom code <span className="text-body-secondary">(optional)</span>
					</Form.Label>
					<InputGroup>
						<InputGroup.Text className="code-prefix">
							{process.env.NEXT_PUBLIC_BASE_URL}/
						</InputGroup.Text>
						<Form.Control
							value={code}
							onChange={(e) => setCode(e.target.value)}
							id="code"
							type="text"
							placeholder="my-link"
						/>
					</InputGroup>
					<Form.Text>3-20 characters: letters, numbers and hyphens</Form.Text>
				</div>
			</Form>

			{errorMessage !== "" && (
				<Alert variant="danger" className="app-alert pop-in">
					{errorMessage}
				</Alert>
			)}

			{shortLink && (
				<Card className="result-card pop-in">
					<Card.Body>
						<p className="result-label">
							<span className="result-check">✓</span>
							Your short link is ready
						</p>
						<div className="result-row">
							<a href={shortLink} target="_blank" className="short-link">
								{shortLink}
							</a>
							<Button
								onClick={() => handleCopy()}
								type="button"
								variant={isCopied ? "success" : "outline-secondary"}
								className="copy-btn"
							>
								{isCopied ? "Copied ✓" : "Copy"}
							</Button>
						</div>
						<p className="original-url text-truncate">{newLink.url}</p>
					</Card.Body>
				</Card>
			)}
		</section>
	);
}
