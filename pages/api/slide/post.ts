import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Module } from "../models/module";
import { Slide, SlideInterface } from "../models/slide";

const post = async (
    req: NextApiRequest,
    res: NextApiResponse<SlideInterface | ErrorResponse>,
): Promise<void> => {
    const { id } = req.query;
    const module = await Module.findById(id).exec();

    if (!module) {
        res.status(404).send({
            error: "The module with the given ID was not found.",
        });
        return;
    }

    const { components } = req.body;
    const slide = new Slide({
        components,
    });
    slide.save();
    // Creates a new slide at the end of the ordered list of slides
    module.slides.push(slide.id);
    module.save();

    res.status(200).json(slide);
};

export { post };
