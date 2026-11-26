import { readLinks, writeLinks } from "@/lib/db";

const CODE_REGEX = /^[a-zA-Z0-9-]{3,20}$/;
const RESERVED_CODES = ["links", "api"];

const generateCode = () => {
	let result = "";
	const chars =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	for (let i = 0; i < 6; i++) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}
	return result;
};

const Handler = async (req, res) => {
	if (req.method === "POST") {
		const url = req.body?.url;
		const code = req.body?.code;

		if (typeof url !== "string" || !url.trim()) {
			return res.status(400).json({ message: "URL is required." });
		}

		const trimmedUrl = url.trim();

		if (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://")) {
			return res
				.status(400)
				.json({ message: "URL must start with http:// or https://." });
		}

		let parsedUrl;
		try {
			parsedUrl = new URL(trimmedUrl);
		} catch (error) {
			return res.status(400).json({ message: "URL is not valid." });
		}

		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
		if (baseUrl && parsedUrl.host === new URL(baseUrl).host) {
			return res
				.status(400)
				.json({ message: "You cannot shorten a Route Snipper link." });
		}

		if (code && (typeof code !== "string" || !CODE_REGEX.test(code))) {
			return res.status(400).json({
				message:
					"Code must be 3-20 characters long (letters, numbers and hyphens only).",
			});
		}

		if (code && RESERVED_CODES.includes(code.toLowerCase())) {
			return res
				.status(400)
				.json({ message: "This code is reserved. Please choose another one." });
		}

		const links = await readLinks();

		if (code && links.some((link) => link.code === code)) {
			return res.status(409).json({ message: "This code is already taken." });
		}
		let finalCode = code ? code : generateCode();
		while (links.some((link) => link.code === finalCode)) {
			finalCode = generateCode();
		}
		const newLink = {
			code: finalCode,
			url: trimmedUrl,
			clicks: 0,
			createdAt: new Date().toISOString(),
		};
		const updatedLinks = [...links, newLink];
		await writeLinks(updatedLinks);
		return res.status(201).json(newLink);
	}

	if (req.method === "GET") {
		const search =
			typeof req.query.search === "string"
				? req.query.search.toLowerCase()
				: "";
		const allLinks = await readLinks();

		if (!search) {
			return res.status(200).json(allLinks);
		}
		return res
			.status(200)
			.json(
				allLinks.filter(
					(link) =>
						link.url.toLowerCase().includes(search) ||
						link.code.toLowerCase().includes(search),
				),
			);
	}

	return res.status(405).json({ message: "Method not allowed." });
};

export default Handler;
