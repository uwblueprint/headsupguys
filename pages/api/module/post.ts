import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Module, ModuleInterface } from "../models/module";
import connectDB from "../utils/mongoose";

const post = async (
    req: NextApiRequest,
    res: NextApiResponse<ModuleInterface | ErrorResponse>,
): Promise<void> => {
    const postModule = new Module({
        title: req.body.title,
        tool: req.body.tool,
        slides: req.body.slides,
        status: req.body.status,
        editing: req.body.editing,
    });
    await postModule.save();
    res.status(200).send(module);
};

export default connectDB(post);
