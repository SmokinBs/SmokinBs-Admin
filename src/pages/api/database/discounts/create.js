export default async (req, res) => {
	console.log(req.body);
	const data = await (
		await fetch(`${process.env.API_URL}/v0/discounts/create`, {
			method: "POST",
			headers: { Authorization: process.env.API_CREDENTIALS, "Content-Type": "application/json" },
			body: req.body,
		})
	).json();
	return res.json({ success: data.success });
};
