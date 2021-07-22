import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Module, ModuleInterface } from "../../../database/models/module";
import { Tool } from "../../../database/models/tool";
import connectDB from "../utils/mongoose";

const post = async (
    req: NextApiRequest,
    res: NextApiResponse<ModuleInterface | ErrorResponse>,
): Promise<void> => {
    if (!req.body.title)
        return res
            .status(400)
            .send({ error: "Please provide your module with a title." });

    if (req.body.toolID) {
        const tool = await Tool.findById(req.body.toolID);
        if (tool) {
            tool.moduleID = module.id;
            await tool.save();
        } else {
            return res.status(400).send({
                error: "Invalid toolID.",
            });
        }
    }
    await Module.create(req.body)
        .then((module) => res.status(200).json(module))
        .catch((err) => res.status(400).send(err));
};

export default connectDB(post);
