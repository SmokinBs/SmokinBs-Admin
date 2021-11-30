import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const body = JSON.parse(req.body);

    await fetch(
        `${process.env.API_URL}/v0/alerts/delete?authId=${process.env.API_CREDENTIALS}&id=${body.id}`,
    )
        .then((res) => res.json())
        .then((data) => {
            res.json({ success: data.success });
        });
});
