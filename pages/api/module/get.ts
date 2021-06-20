import { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "querystring";
import { Module } from "../models/module";

const get = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { id } = req.query;
    const all = await Module.find({ _id: id.toString() });
    console.log(all);
    if (!module)
        return res
            .status(404)
            .send("The module with the given ID was not found.");

    res.status(200).json(module);
};

export { get };
