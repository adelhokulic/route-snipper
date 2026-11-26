import { readLinks, writeLinks } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

const CodePage = async ({ params }) => {
	const paramsResponse = await params;
	const links = await readLinks();

	const foundLink = links.find((link) => link.code === paramsResponse.code);
	if (!foundLink) {
		notFound();
	}
	const updatedLinks = links.map((link) =>
		link.code === paramsResponse.code
			? { ...link, clicks: link.clicks + 1 }
			: link,
	);
	await writeLinks(updatedLinks);
	redirect(foundLink.url);
};
export default CodePage;
