import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "links.json");

export const readLinks = async () => {
	const value = await fs.readFile(filePath, "utf-8");
	if (!value.trim()) {
		return [];
	}
	return JSON.parse(value);
};

export const writeLinks = async (links) => {
	return await fs.writeFile(filePath, JSON.stringify(links, null, 2));
};
