import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await (await fetch(
        `${process.env.API_URL}/v0/foods/update`, {
			method: "PATCH",
			headers: { "Authorization": process.env.API_CREDENTIALS!, "Content-Type": "application/json"},
			body: req.body
		}
    )).json()
	
	res.json({ success: data.success });
});
