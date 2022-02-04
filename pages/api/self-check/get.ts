import { NextApiRequest, NextApiResponse } from "next";
import { SelfCheckGroup } from "database/models/selfCheckGroup";
import connectDB from "../utils/mongoose";

const getSelfCheckByID = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { id } = req.query;
    const selfCheck = await SelfCheckGroup.findById(id)
        .exec()
        .catch(() => {
            if (!selfCheck) {
                return res.status(404).send({
                    error: "The self check with the given ID was not found.",
                });
            }
        });
    res.status(200).json(selfCheck);
};

export default connectDB(getSelfCheckByID);
