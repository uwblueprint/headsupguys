import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Module } from "../../../database/models/module";

const del = async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponse>,
): Promise<void> => {
    const { id } = req.query;
    const module = await Module.findByIdAndDelete(id);

    if (module) {
        res.status(204).end();
    } else {
        res.status(404).send({
            error: "The module with the given ID was not found.",
        });
    }
    return;
};

export default del;
