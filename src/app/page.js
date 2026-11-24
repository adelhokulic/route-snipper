"use client";

import { createLink } from "@/services/linkService";
import { useState } from "react";

export default function Home() {
	const [url, setUrl] = useState("");
	const [code, setCode] = useState("");
	const [newLink, setNewLink] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isCopied, setIsCopied] = useState(false);

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

	const handleCopy = () => {
		navigator.clipboard.writeText(shortLink);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};
	return (
		<section className="card">
			<h1 className="title">Shorten a link</h1>
			<p className="subtitle">
				Paste a long link and get a short address that is easy to share.
			</p>

			<form onSubmit={handleSubmit} className="form">
				<label className="label" htmlFor="url">
					Long URL
				</label>
				<input
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					id="url"
					type="text"
					className="input"
					placeholder="https://example.com/some/very/long/link"
				/>

				<label className="label" htmlFor="code">
					Custom code <span className="optional">(optional)</span>
				</label>
				<input
					value={code}
					onChange={(e) => setCode(e.target.value)}
					id="code"
					type="text"
					className="input"
					placeholder="my-link"
				/>
				<p className="hint">3-20 characters: letters, numbers and hyphens</p>
				<button disabled={isLoading} type="submit" className="btn btn-primary">
					{isLoading ? "Shortening..." : "Shorten"}
				</button>
			</form>

			{errorMessage !== "" && <p className="error">{errorMessage}</p>}

			{shortLink && (
				<div className="result">
					<p className="result-label">Your short link:</p>
					<div className="result-row">
						<a href={shortLink} target="_blank" className="short-link">
							{shortLink}
						</a>
						<button
							onClick={() => handleCopy()}
							type="button"
							className="btn btn-secondary"
						>
							{isCopied ? "Copied ✓" : "Copy"}
						</button>
					</div>
					<p className="original-url">{newLink.url}</p>
				</div>
			)}
		</section>
	);
}
