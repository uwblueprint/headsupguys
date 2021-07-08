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
            .status(404)
            .send({ error: "Please provide your module with a title." });
    const module = new Module({
        title: req.body.title,
        toolID: req.body.toolID,
        slideIDs: req.body.slideIDs,
        status: req.body.status,
        editing: req.body.editing,
    });
    if (module.toolID) {
        const tool = await Tool.findById(module.toolID).exec();
        if (tool) {
            tool.moduleID = module.id;
            await tool.save();
        } else {
            return res.status(404).send({
                error: "Invalid toolID.",
            });
        }
    }
    await module.save();
    res.status(200).json(module);
};

export default connectDB(post);
