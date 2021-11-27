import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (_req: NextApiRequest, res: NextApiResponse) => {
    const data: any = await (await fetch(`https://admin.smokinbsbbqtest.tk/api/open-status`)).json();

    console.log(data.isServerOpen);
    res.json({ isServerOpen: data.isServerOpen });
});
