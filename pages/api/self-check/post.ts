import { NextApiRequest, NextApiResponse } from "next";
import { SelfCheckGroup } from "../models/selfCheckGroup";
import { SelfCheckQuestion } from "../models/selfCheckQuestion";

const postSelfCheck = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    // Get a list of self check questions
    const { questions } = req.body;
    console.log(questions);

    // For each, create a SelfCheckQuestion
    const selfCheckQuestions = await SelfCheckQuestion.insertMany(
        questions,
    ).catch(function (error) {
        console.log(error); // Failure
    });
    console.log(selfCheckQuestions);

    // Get ID of each self check question
    const questionIDs = [];
    for (let i = 0; i < selfCheckQuestions.length; i++) {
        questionIDs.push(selfCheckQuestions[i]._id);
    }
    console.log(questionIDs);

    // Use IDs to create SelfCheckGroup
    const selfCheck = new SelfCheckGroup({
        questionIDs: questionIDs,
    });
    selfCheck.save();
    res.status(200).send(selfCheck);
};

export { postSelfCheck };
