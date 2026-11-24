import { readLinks, writeLinks } from "@/lib/db";
import { redirect } from "next/navigation";

const CodePage = async ({ params }) => {
	const paramsResponse = await params;
	const links = await readLinks();

	const foundLink = links.find((link) => link.code === paramsResponse.code);
	if (!foundLink) {
		return (
			<section className="not-found text-center fade-up">
				<p className="not-found-code">404</p>
				<h1 className="page-title">Link not found</h1>
				<p className="lead-muted mx-auto">
					The short link <code>/{paramsResponse.code}</code> does not exist or
					was deleted.
				</p>
				<a href="/" className="btn btn-primary btn-lg mt-2">
					Shorten a new link
				</a>
			</section>
		);
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
