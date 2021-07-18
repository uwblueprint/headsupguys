import { NextApiRequest, NextApiResponse } from "next";
import { SelfCheckQuestion } from "../models/selfCheckQuestion";

const getQuestionByID = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { id } = req.query;
    const selfCheckQuestion = await SelfCheckQuestion.findById(id)
        .exec()
        .catch(() => {
            if (!selfCheckQuestion) {
                return res.status(404).send({
                    error: "The self check question with the given ID was not found.",
                });
            }
        });

    res.status(200).json(selfCheckQuestion);
};

export { getQuestionByID };
