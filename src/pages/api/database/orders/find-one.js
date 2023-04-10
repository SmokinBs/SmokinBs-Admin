export default async (req, res) => {
	const data = await (
		await fetch(`${process.env.API_URL}/v0/orders/find-one?id=${req.query.id}`, {
			method: "GET",
			headers: {
				Authorization: process.env.API_CREDENTIALS,
				"Content-Type": "application/json",
			},
		})
	).json();
	return res.json({ success: data.success, errorMessage: data.errorMessage, order: data.order });
};
