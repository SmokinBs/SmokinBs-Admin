export default async (req, res) => {
	const data = await (
		await fetch(`${process.env.API_URL}/v0/foods/create`, {
			method: "POST",
			headers: { Authorization: process.env.API_CREDENTIALS, "Content-Type": "application/json" },
			body: req.body,
		})
	).json();

	res.json({ success: data.success });
};
