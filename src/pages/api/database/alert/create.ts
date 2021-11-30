import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const body = JSON.parse(req.body);

    const data = await (
        await fetch(
            `${process.env.API_URL}/v0/alerts/create?authId=${process.env.API_CREDENTIALS}&name=${body.name}&content=${body.content}&expires=${body.expires}`,
        )
    ).json();

    return res.json({ success: data.success });
});
