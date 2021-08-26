import { NextApiRequest, NextApiResponse } from "next";
import { SelfCheckGroup } from "database/models/selfCheckGroup";
import { SelfCheckQuestion } from "database/models/selfCheckQuestion";

const delSelfCheckByID = async (
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

    // Delete self check
    SelfCheckGroup.deleteOne({ _id: id }, (error) => {
        return res.status(501).send({ error: error }); // Failure
    });
    res.status(204).send({});
};

export { delSelfCheckByID };
