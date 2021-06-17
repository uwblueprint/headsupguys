import { NextApiRequest, NextApiResponse } from "next";
import { Module } from "../../../models/module";

const get = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { toolIid } = req.query;
    const module = await Module.findById(toolIid).exec();

    if (!module)
        return res
            .status(404)
            .send("The module with the given ID was not found.");

    res.status(200).json(module);
};

export { get };

//Will each tool only have 1 module associated with it?
