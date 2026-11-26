"use client";

import { deleteLink, getLinks } from "@/services/linkService";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const LinksPage = () => {
	const [links, setLinks] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const loadData = async () => {
			setErrorMessage("");
			try {
				const links = await getLinks(searchTerm);
				setLinks(links);
			} catch (error) {
				setErrorMessage(error.message);
			}
			setIsLoading(false);
		};
		const timer = setTimeout(() => loadData(), 400);
		return () => clearTimeout(timer);
	}, [searchTerm]);

	const handleDelete = async (code) => {
		if (!window.confirm(`Delete the short link /${code}?`)) {
			return;
		}
		try {
			await deleteLink(code);
			setLinks((prevLinks) => prevLinks.filter((link) => link.code !== code));
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	return (
		<section className="fade-up">
			<div className="page-head">
				<div>
					<h1 className="page-title">All links</h1>
					<p className="text-body-secondary mb-0">
						Every short link with its clicks.
					</p>
				</div>
				<span className="count-pill">
					{links.length} {links.length === 1 ? "link" : "links"}
				</span>
			</div>

			<Card className="app-card">
				<Card.Header className="app-card-header">
					<InputGroup className="search-group">
						<InputGroup.Text>🔍</InputGroup.Text>
						<Form.Control
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							type="text"
							placeholder="Search by URL or code..."
							aria-label="Search by URL or code"
						/>
					</InputGroup>
				</Card.Header>

				{isLoading && (
					<div className="state-box">
						<Spinner animation="border" size="sm" className="me-2" />
						Loading...
					</div>
				)}

				{errorMessage && (
					<Alert variant="danger" className="app-alert m-3">
						{errorMessage}
					</Alert>
				)}

				{!isLoading && !errorMessage && links.length === 0 && (
					<div className="state-box">No links found.</div>
				)}

				{links.length > 0 && (
					<Table responsive hover className="links-table mb-0">
						<thead>
							<tr>
								<th>Short link</th>
								<th>Original URL</th>
								<th className="text-center">Clicks</th>
								<th className="d-none d-md-table-cell">Created</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{links.map((link) => {
								return (
									<tr key={link.code}>
										<td>
											<a
												href={`/${link.code}`}
												target="_blank"
												className="link-code"
											>
												/{link.code}
											</a>
										</td>
										<td>
											<span className="link-url" title={link.url}>
												{link.url}
											</span>
										</td>
										<td className="text-center">
											<span className="clicks-pill">{link.clicks}</span>
										</td>
										<td className="d-none d-md-table-cell text-body-secondary">
											{new Date(link.createdAt).toLocaleDateString()}
										</td>
										<td className="text-end">
											<Button
												onClick={() => handleDelete(link.code)}
												type="button"
												variant="outline-danger"
												size="sm"
											>
												Delete
											</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				)}
			</Card>
		</section>
	);
};

export default LinksPage;
