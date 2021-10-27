import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Module, ModuleInterface } from "../../../database/models/module";

const get = async (
    req: NextApiRequest,
    res: NextApiResponse<ModuleInterface | ErrorResponse>,
): Promise<void> => {
    const { id, includeSlide } = req.query;
    const module = await Module.findById(id);
    if (includeSlide){
        await module.populate("slideIDs").execPopulate();
    }
    if (!module)
        return res
            .status(404)
            .send({ error: "The module with the given ID was not found." });

    res.status(200).json(module);
};

export { get };
