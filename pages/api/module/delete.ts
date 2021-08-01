import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Module } from "../../../database/models/module";

const del = async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponse>,
): Promise<void> => {
    const { id } = req.query;
    const module = await Module.findByIdAndDelete(id);

    if (!module)
        return res
            .status(404)
            .send({ error: "The module with the given ID was not found." });
    res.status(204).send({});
};

export { del };
