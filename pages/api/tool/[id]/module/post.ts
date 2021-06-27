import { NextApiRequest, NextApiResponse } from "next";
import { Tool } from "../../../models/tool";
import post from "../../../module/post";

const toolPost = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { id } = req.query;
    const tool = await Tool.findById(id).exec();
    if (!tool)
        return res
            .status(404)
            .send({ error: "The module with the given ID was not found." });
    post(req, res);
};

export { toolPost };
