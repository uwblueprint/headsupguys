import { Slide, SlideInterface } from "database/models/slide";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Module, ModuleInterface } from "../../../database/models/module";

const patch = async (
    req: NextApiRequest,
    res: NextApiResponse<ModuleInterface | ErrorResponse>,
): Promise<void> => {
    const { id } = req.query;
    const module = await Module.findById(id);

    if (!module)
        return res
            .status(404)
            .send({ error: "The module with the given ID was not found." });

    const { __v, _id, slides: slidesData, ...moduleData } = req.body;

    for (const key in moduleData) {
        module[key] = req.body[key];
    }

    const slides: SlideInterface[] = await Promise.all(
        slidesData.map((slide) => {
            if (slide._id) {
                return Slide.findByIdAndUpdate(slide._id, slide, {
                    upsert: true,
                });
            } else {
                return Slide.create(slide);
            }
        }),
    );

    module.slides = slides.map((slide) => slide._id);

    await module.save();
    res.status(200).send(module);
};

export { patch };
