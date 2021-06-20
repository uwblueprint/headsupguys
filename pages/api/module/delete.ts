import { NextApiRequest, NextApiResponse } from "next";
import { Module } from "../models/module";

const del = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { id } = req.query;
    const module = await Module.findByIdAndDelete(id).exec();

    if (!module)
        return res
            .status(404)
            .send("The module with the given ID was not found.");
    res.status(200).json(module);
};

export { del };
