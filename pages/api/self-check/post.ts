import { NextApiRequest, NextApiResponse } from "next";
import { SelfCheckGroup } from "database/models/selfCheckGroup";
import { SelfCheckQuestion } from "database/models/selfCheckQuestion";

const postSelfCheck = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    // Get a list of self check questions
    const { questions } = req.body;

    // For each, create a SelfCheckQuestion
    const selfCheckQuestions = await SelfCheckQuestion.insertMany(
        questions,
    ).catch((error) => {
        return res.status(501).send({ error: error }); // Failure
    });

    // Get ID of each self check question
    const questionIDs = [];
    for (let i = 0; i < selfCheckQuestions.length; i++) {
        questionIDs.push(selfCheckQuestions[i]._id);
    }

    // Use IDs to create SelfCheckGroup
    const selfCheck = new SelfCheckGroup({
        questionIDs: questionIDs,
    });
    selfCheck.save();
    res.status(200).send(selfCheck);
};

export { postSelfCheck };
