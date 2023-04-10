export default async (req, res) => {
	console.log(req.body);
	const data = await (
		await fetch(`${process.env.API_URL}/v0/alerts/create`, {
			method: "POST",
			headers: { Authorization: process.env.API_CREDENTIALS, "Content-Type": "application/json" },
			body: req.body,
		})
	).json();
	console.log(data);
	return res.json({ success: data.success });
};
