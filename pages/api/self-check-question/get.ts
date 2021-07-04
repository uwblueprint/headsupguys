import { NextApiRequest, NextApiResponse } from "next";
import { SelfCheckQuestion } from "../models/selfCheckQuestion";

const getQuestionByID = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { id } = req.query;
    console.log(id);
    let selfCheckQuestion;
    try {
        selfCheckQuestion = await SelfCheckQuestion.findById(id);
    } catch (err) {
        console.log("error is ", err);
    }

    if (!selfCheckQuestion) {
        return res
            .status(404)
            .send({ error: "The self check with the given ID was not found." });
    }

    res.status(200).json(selfCheckQuestion);
};

export { getQuestionByID };
