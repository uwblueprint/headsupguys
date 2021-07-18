import { NextApiRequest, NextApiResponse } from "next";
import { SelfCheckGroup } from "../models/selfCheckGroup";
import { SelfCheckQuestion } from "../models/selfCheckQuestion";

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

    // Delete all questions in self check
    selfCheck.questionIDs.forEach((i) => {
        const selfCheckQuestion = SelfCheckQuestion.findByIdAndDelete(i)
            .exec()
            .catch(() => {
                if (!selfCheckQuestion) {
                    return res.status(404).send({
                        error: "The self check question with the given ID was not found.",
                    });
                }
            });
    });

    // Get a list of self check questions, create a SelfCheckQuestion for each
    const { questions } = req.body;
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

    // Save self check with updated questions
    selfCheck.questionIDs = [...questionIDs];
    await selfCheck.save();
    res.status(200).send(selfCheck);
};

export { patchSelfCheckByID };
