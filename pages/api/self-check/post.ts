import { NextApiRequest, NextApiResponse } from "next";
import { SelfCheckGroup } from "database/models/selfCheckGroup";

const post = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    // Get a list of self check questions
    const { questions } = req.body;

    // Use IDs to create SelfCheckGroup
    const selfCheck = new SelfCheckGroup({
        questions: questions,
    });

    selfCheck.save().catch((err) => {
        res.status(500).send(err);
    });

    res.status(200).send(selfCheck);
};

export default post;
