import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Tool, ToolInterface } from "../../../database/models/tool";
import connectDB from "../utils/mongoose";

const post = async (
    req: NextApiRequest,
    res: NextApiResponse<ToolInterface | ErrorResponse>,
): Promise<void> => {
    if (!req.body.title)
        return res
            .status(404)
            .send({ error: "Please provide your tool with a title." });
    const tool = new Tool({
        title: req.body.title,
        video: req.body.video,
        description: req.body.description,
        moduleID: req.body.moduleID,
        resources: req.body.resources,
        selfCheckGroupID: req.body.selfCheckGroupID,
        relatedToolsIDs: req.body.relatedToolsIDs,
        status: req.body.status,
        editing: req.body.editing,
    });
    await tool.save();
    res.status(200).json(tool);
};

export default connectDB(post);
