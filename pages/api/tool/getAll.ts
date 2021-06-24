import { Tool } from "database/models/tool";
import { NextApiRequest, NextApiResponse } from "next";

const getAll = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const allTools = await Tool.find({});
    res.status(200).json(allTools);
};

export default getAll;
