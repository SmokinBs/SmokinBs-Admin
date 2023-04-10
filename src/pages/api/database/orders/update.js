export default async (req, res) => {
	const data = await (
		await fetch(`${process.env.API_URL}/v0/orders/update`, {
			method: "PATCH",
			headers: {
				Authorization: process.env.API_CREDENTIALS,
				"Content-Type": "application/json",
			},
			body: req.body,
		})
	).json();

	return res.json({ success: data.success, errorMessage: data.errorMessage });
};
