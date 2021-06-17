import { NextApiRequest, NextApiResponse } from "next";
import { Slide } from "../models/slide";

const get = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { id } = req.query;
    const slide = await Slide.findById(id).exec();

    if (!slide)
        return res
            .status(404)
            .send("The slide with the given ID was not found.");

    res.status(200).json(slide);
};

export { get };
