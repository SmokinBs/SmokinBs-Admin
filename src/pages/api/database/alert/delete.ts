import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const body = JSON.parse(req.body);

    const data = await (await fetch(
        `${process.env.API_URL}/v0/alerts/delete?id=${body.id}`, {
			headers: { "Authorization": process.env.API_CREDENTIALS! }
		}
    )).json();

	res.json({ success: data.success });
});
