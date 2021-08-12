import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Module, ModuleInterface } from "../../../database/models/module";

const getAll = async (
    req: NextApiRequest,
    res: NextApiResponse<ModuleInterface | ErrorResponse>,
): Promise<void> => {
    await Module.find({})
        .then((modules) => res.status(200).json(modules))
        .catch((err) => res.status(500).send(err));
};

export default getAll;