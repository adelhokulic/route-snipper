const readResponse = async (response) => {
	let data;
	try {
		data = await response.json();
	} catch (error) {
		throw new Error("Something went wrong. Please try again.");
	}
	if (!response.ok) {
		throw new Error(data.message);
	}
	return data;
};

export const createLink = async (url, code) => {
	const response = await fetch("/api/links", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ url, code }),
	});
	return readResponse(response);
};

export const getLinks = async (search = "") => {
	const response = await fetch(
		`/api/links?search=${encodeURIComponent(search)}`,
	);
	return readResponse(response);
};

export const deleteLink = async (code) => {
	const response = await fetch(`/api/links/${encodeURIComponent(code)}`, {
		method: "DELETE",
	});
	return readResponse(response);
};
