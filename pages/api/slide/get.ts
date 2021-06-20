import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Slide, SlideInterface } from "../models/slide";

const get = async (
    req: NextApiRequest,
    res: NextApiResponse<SlideInterface | ErrorResponse>,
): Promise<void> => {
    const { id } = req.query;
    const slide = await Slide.findById(id).exec();

    if (!slide)
        return res
            .status(404)
            .send({ error: "The slide with the given ID was not found." });

    res.status(200).json(slide);
};

export { get };
