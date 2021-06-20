import { NextApiRequest, NextApiResponse } from "next";
import { SelfCheckGroup } from "../models/selfCheckGroup";

const patchSelfCheckByID = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { id } = req.query;
    const selfCheck = await SelfCheckGroup.findById(id).exec();

    if (!selfCheck)
        return res
            .status(404)
            .send("The self check with the given ID was not found.");

    for (const key in req.body) {
        if (selfCheck[key] && selfCheck[key] !== req.body[key])
            selfCheck[key] = req.body[key];
    }

    await selfCheck.save();
    res.status(200).send(selfCheck);
};

export { patchSelfCheckByID };
