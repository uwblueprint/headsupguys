import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Progress, ProgressInterface } from "../../../database/models/progress";
import connectDB from "../utils/mongoose";

const get = async (
    req: NextApiRequest,
    res: NextApiResponse<ProgressInterface | ErrorResponse>,
): Promise<void> => {
    const username = req.query.username as string; // TODO: is this ok
    const module = req.query.module as string;

    const progress = await Progress.findOne({
        username: username,
        module: module,
    });

    if (!progress)
        return res.status(404).send({
            error: "The progress with the given username and module was not found.",
        });

    res.status(200).json(progress);
};

export default connectDB(get);
