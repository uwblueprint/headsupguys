import { NextApiRequest, NextApiResponse } from "next";
import { Tool } from "../../../../../database/models/tool";
import post from "../../../module/post";
import connectDB from "../../../utils/mongoose";

const toolPost = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { id } = req.query;
    const tool = await Tool.findById(id).exec();
    if (!tool)
        return res
            .status(404)
            .send({ error: "The tool with the given ID was not found." });
    req.body.toolID = id;
    post(req, res);
};

export default connectDB(toolPost);
