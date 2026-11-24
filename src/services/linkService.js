export const createLink = async (url, code) => {
	const response = await fetch("/api/links", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ url, code }),
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message);
	}
	return data;
};

export const getLinks = async (search = "") => {
	const response = await fetch(`/api/links?search=${search}`);
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message);
	}
	return data;
};

export const deleteLink = async (code) => {
	const response = await fetch(`/api/links/${code}`, {
		method: "DELETE",
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message);
	}
	return data;
};
