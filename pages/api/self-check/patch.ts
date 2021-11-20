import { NextApiRequest, NextApiResponse } from "next";
import { SelfCheckGroup } from "database/models/selfCheckGroup";

const patchSelfCheckByID = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    // Find self check by id
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

    const questions = req.body;
    // Save self check with updated questions
    selfCheck.questions = questions;
    await selfCheck.save();
    res.status(200).send(selfCheck);
};

export default patchSelfCheckByID;
