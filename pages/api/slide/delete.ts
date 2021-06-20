import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Slide } from "../models/slide";

const del = async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponse>,
): Promise<void> => {
    const { id } = req.query;
    const slide = await Slide.findByIdAndDelete(id);

    if (slide) {
        res.status(204).send({});
    } else {
        res.status(404).send({ error: "Slide not found" });
    }
    return;
};

export { del };
