import { Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Module } from "../../../database/models/module";
import { Slide } from "../../../database/models/slide";
import connectDB from "../utils/mongoose";

const del = async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponse>,
): Promise<void> => {
    const { id, sid } = req.query;
    const module = await Module.findById(id);
    if (Array.isArray(sid)) {
        res.status(400).send({ error: "Invalid slide id" });
        return;
    }
    const slideId = Types.ObjectId(sid);
    module.slides = module.slides.filter((id) => !id.equals(slideId));
    module.save();
    const slide = await Slide.findByIdAndDelete(sid);

    if (slide) {
        res.status(204).send({});
    } else {
        res.status(404).send({ error: "Slide not found" });
    }
    return;
};

export default connectDB(del);
