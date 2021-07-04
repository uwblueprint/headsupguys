import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Module, ModuleInterface } from "../../../database/models/module";

const patch = async (
    req: NextApiRequest,
    res: NextApiResponse<ModuleInterface | ErrorResponse>,
): Promise<void> => {
    const { id } = req.query;
    const module = await Module.findById(id).exec();

    if (!module)
        return res
            .status(404)
            .send({ error: "The module with the given ID was not found." });

    for (const key in req.body) {
        if (module[key] && module[key] !== req.body[key])
            module[key] = req.body[key];
    }

    await module.save();
    res.status(200).send(module);
};

export { patch };
