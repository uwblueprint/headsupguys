import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Module } from "../../../database/models/module";
import { Slide, SlideInterface } from "../../../database/models/slide";
import connectDB from "../utils/mongoose";

const patch = async (
    req: NextApiRequest,
    res: NextApiResponse<SlideInterface | ErrorResponse>,
): Promise<void> => {
    const { id } = req.query;
    const slide = await Slide.findById(id).exec();

    if (!slide)
        return res
            .status(404)
            .send({ error: "The slide with the given ID was not found." });

    await Module.findByIdAndUpdate(id, req.body, { new: true })
        .then((tool) => res.status(200).json(tool))
        .catch((err) => res.status(500).send(err));
};

export default connectDB(patch);
