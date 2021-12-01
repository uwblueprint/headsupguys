import { Module } from "database/models/module";
import { NextApiRequest, NextApiResponse } from "next";

const getAll = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    try {
        const modules = await Module.find({});
        res.status(200).json(modules);
    } catch (err) {
        res.status(500).json(err);
    }
};

export default getAll;
