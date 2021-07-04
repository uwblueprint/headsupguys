import { NextApiRequest, NextApiResponse } from "next";
import { SelfCheckGroup } from "../models/selfCheckGroup";
import { SelfCheckQuestion } from "../models/selfCheckQuestion";

const patchSelfCheckByID = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    // Find self check by id
    const { id } = req.query;
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

    // Get a list of self check questions, create a SelfCheckQuestion for each
    const { questions } = req.body;
    const selfCheckQuestions = await SelfCheckQuestion.insertMany(
        questions,
    ).catch(function (error) {
        console.log(error); // Failure
    });

    // Get ID of each self check question
    const questionIDs = [];
    for (let i = 0; i < selfCheckQuestions.length; i++) {
        questionIDs.push(selfCheckQuestions[i]._id);
    }

    // Save self check with updated questions
    selfCheck.questionIDs = [...questionIDs];
    await selfCheck.save();
    res.status(200).send(selfCheck);
};

export { patchSelfCheckByID };
