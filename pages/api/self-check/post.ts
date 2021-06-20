import { NextApiRequest, NextApiResponse } from "next";
import { SelfCheckGroup } from "../models/selfCheckGroup";

const postSelfCheck = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    try {
        const selfCheck = new SelfCheckGroup({});
        selfCheck.save();
        res.status(200).send(selfCheck);
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

export { postSelfCheck };
