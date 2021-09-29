import { Module } from "database/models/module";
import { NextApiRequest, NextApiResponse } from "next";

const getAll = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    await Module.find({})
        .then((modules) => res.status(200).json(modules))
        .catch((err) => res.status(500).send(err));
};

export default getAll;
