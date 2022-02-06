import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Module, ModuleInterface } from "../../../database/models/module";
import { Slide } from "../../../database/models/slide";
import connectDB from "../utils/mongoose";

const get = async (
    req: NextApiRequest,
    res: NextApiResponse<ModuleInterface | ErrorResponse>,
): Promise<void> => {
    const { id, includeSlide } = req.query;
    const module = await Module.findById(id);
    if (includeSlide) {
        // Slide model must be loaded in order to populate
        // TODO: find workaround/cleaner soln :/
        // Slide.init is a no-op if already initialized
        Slide.init();
        await module.populate("slides").execPopulate();
    }
    if (!module)
        return res
            .status(404)
            .send({ error: "The module with the given ID was not found." });

    res.status(200).json(module);
};

export default connectDB(get);
