import { readLinks, writeLinks } from "@/lib/db";

const Handler = async (req, res) => {
	const code = req.query.code;
	const links = await readLinks();
	if (req.method === "GET") {
		const foundLink = links.find((link) => link.code === code);
		if (!foundLink) {
			return res.status(404).json({ message: "Link not found." });
		}
		return res.status(200).json(foundLink);
	}
	if (req.method === "DELETE") {
		const foundLink = links.find((link) => link.code === code);
		if (foundLink) {
			const filteredLinks = links.filter((link) => link.code !== code);
			await writeLinks(filteredLinks);
			return res.status(200).json({ message: "Link deleted." });
		}
		return res.status(404).json({ message: "Link not found." });
	}
	return res.status(405).json({ message: "Method not allowed." });
};

export default Handler;
