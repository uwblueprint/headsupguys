import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Module, ModuleInterface } from "../../../database/models/module";
import connectDB from "../utils/mongoose";

const post = async (
    req: NextApiRequest,
    res: NextApiResponse<ModuleInterface | ErrorResponse>,
): Promise<void> => {
    if (!req.body.title)
        return res
            .status(404)
            .send({ error: "Please provide your module with a title." });
    const module = new Module({
        title: req.body.title,
        tool: req.body.tool,
        slides: req.body.slides,
        status: req.body.status,
        editing: req.body.editing,
    });
    await module.save();
    res.status(200).json(module);
};

export default connectDB(post);
