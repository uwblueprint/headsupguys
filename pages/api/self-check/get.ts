import { NextApiRequest, NextApiResponse } from "next";
import { SelfCheckGroup } from "../models/selfCheckGroup";

const getSelfCheckByID = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { id } = req.query;
    console.log(id);
    let selfCheck;
    try {
        selfCheck = await SelfCheckGroup.findById(id);
    } catch (err) {
        console.log("error is ", err);
    }

    if (!selfCheck) {
        return res
            .status(404)
            .send({ error: "The self check with the given ID was not found." });
    }

    res.status(200).json(selfCheck);
};

export { getSelfCheckByID };
