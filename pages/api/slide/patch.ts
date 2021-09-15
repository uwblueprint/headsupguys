import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Slide, SlideInterface } from "../../../database/models/slide";

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

    for (const key in req.body) {
        if (slide[key] && slide[key] !== req.body[key])
            slide[key] = req.body[key];
    }

    await slide.save();
    res.status(200).send(slide);
};

export { patch };
