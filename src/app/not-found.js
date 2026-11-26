const NotFound = () => {
	return (
		<section className="not-found text-center fade-up">
			<p className="not-found-code">404</p>
			<h1 className="page-title">Link not found</h1>
			<p className="lead-muted mx-auto">
				This short link does not exist or was deleted.
			</p>
			<a href="/" className="btn btn-primary btn-lg mt-2">
				Shorten a new link
			</a>
		</section>
	);
};

export default NotFound;
