import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Progress, ProgressInterface } from "../../../database/models/progress";
import connectDB from "../utils/mongoose";

const patch = async (
    req: NextApiRequest,
    res: NextApiResponse<ProgressInterface | ErrorResponse>,
): Promise<void> => {
    const username = req.query.username as string;
    const module = req.query.module as string;

    const progress = await Progress.findOneAndUpdate(
        {
            username: username,
            module: module,
        },
        req.body,
        { new: true },
    );

    if (!progress)
        return res.status(404).send({
            error: "The progress with the given username and module was not found.",
        });

    res.status(200).json(progress);
};

export default connectDB(patch);
