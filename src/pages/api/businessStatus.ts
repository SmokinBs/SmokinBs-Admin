import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (_req: NextApiRequest, res: NextApiResponse) => {
    const data: any = await (await fetch(`${process.env.API_URL}/v0/business-status?authId=${process.env.API_CREDENTIALS}`)).json();

    res.json({ isBusinessOpen: data.isBusinessOpen });
});
