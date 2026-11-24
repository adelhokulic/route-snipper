"use client";

import { deleteLink, getLinks } from "@/services/linkService";
import { useEffect, useState } from "react";

const LinksPage = () => {
	const [links, setLinks] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const loadData = async () => {
			try {
				const links = await getLinks();
				setLinks(links);
			} catch (error) {
				setErrorMessage(error.message);
			}
			setIsLoading(false);
		};
		loadData();
	}, []);

	const handleDelete = async (code) => {
		try {
			await deleteLink(code);
			setLinks(links.filter((link) => link.code !== code));
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	return (
		<section className="card">
			<div className="links-header">
				<h1 className="title">All links</h1>
				<span className="badge">{links.length} links</span>
			</div>

			<input
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				type="text"
				className="input search-input"
				placeholder="Search by URL or code..."
			/>

			{isLoading && <p className="status-text">Loading...</p>}

			{errorMessage && <p className="error">{errorMessage}</p>}

			{!isLoading && !errorMessage && links.length === 0 && (
				<p className="status-text">No links found.</p>
			)}

			<ul className="links-list">
				{links.map((link) => {
					return (
						<li key={link.code} className="link-item">
							<div className="link-info">
								<a href={`/${link.code}`} target="_blank" className="link-code">
									{link.code}
								</a>
								<p className="link-url">{link.url}</p>
								<p className="link-meta">
									<span>👆 {link.clicks} clicks</span>
									<span>
										📅 {new Date(link.createdAt).toLocaleDateString()}
									</span>
								</p>
							</div>

							<button
								onClick={() => handleDelete(link.code)}
								type="button"
								className="btn btn-danger"
							>
								Delete
							</button>
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default LinksPage;
