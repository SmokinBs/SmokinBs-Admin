export default async (req, res) => {
	const body = JSON.parse(req.body);

	const data = await (
		await fetch(`${process.env.API_URL}/v0/foods/delete?id=${body.id}`, {
			headers: { Authorization: process.env.API_CREDENTIALS },
		})
	).json();

	res.json({ success: data.success });
};
