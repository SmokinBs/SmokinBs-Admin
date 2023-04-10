export default async (_req, res) => {
	const data = await (
		await fetch(`${process.env.API_URL}/v0/business-status`, {
			headers: { Authorization: process.env.API_CREDENTIALS },
			method: "POST",
		})
	).json();

	res.json({ isBusinessOpen: data.isBusinessOpen });
};
