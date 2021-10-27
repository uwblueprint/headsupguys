import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Module } from "../../../database/models/module";
import { Slide, SlideInterface } from "../../../database/models/slide";

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

    const { sections, checkpoint, progressBarEnabled, buttons } = req.body;
    const slide = new Slide({
        sections: sections,
        checkpoint: checkpoint,
        progressBarEnabled: progressBarEnabled,
        buttons: buttons,
    });
    slide.save();
    // Creates a new slide at the end of the ordered list of slides
    module.slides.push(slide.id);
    module.save();

    res.status(200).json(slide);
};

export { post };
