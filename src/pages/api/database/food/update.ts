import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const body = JSON.parse(req.body);

    fetch(
        `https://admin.smokinbsbbqtest.tk/api/updateFood?id=${body._id}&name=${body.name}&price=${
            body.price
        }&category=${
            !(body.category === "" || body.category === "No Category") ? body.category : "No-Category"
        }&description=${body.description}`,
    )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            return res.json({ success: data.success });
        })
        .catch((e) => {
            console.log(e);
            res.json({ success: false });
        });
});
