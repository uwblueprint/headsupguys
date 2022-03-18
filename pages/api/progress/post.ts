import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Progress, ProgressInterface } from "../../../database/models/progress";
import connectDB from "../utils/mongoose";

const post = async (
    req: NextApiRequest,
    res: NextApiResponse<ProgressInterface | ErrorResponse>,
): Promise<void> => {
    const { username, module, completion, input } = req.body;

    const progress = new Progress({
        username: username,
        module: module,
        completion: completion,
        input: input,
    });

    await progress
        .save()
        .then((progress) => res.status(200).json(progress))
        .catch((err) => res.status(400).send(err));
};

export default connectDB(post);
