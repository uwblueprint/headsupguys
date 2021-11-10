import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Module, ModuleInterface } from "../../../database/models/module";
import { Tool } from "../../../database/models/tool";
import connectDB from "../utils/mongoose";
import { ObjectId } from "mongodb";
import { Slide } from "database/models/slide";
const post = async (
    req: NextApiRequest,
    res: NextApiResponse<ModuleInterface | ErrorResponse>,
): Promise<void> => {
    if (!req.body.title)
        return res
            .status(400)
            .send({ error: "Please provide your module with a title." });
    const { slides: slidesData, ...moduleData } = req.body;
    const slides = await Promise.all(
        slidesData.map((slideData) => Slide.create(slideData)),
    );
    const module = new Module({
        ...moduleData,
    });

    //If the module contains a tool id...
    if (req.body.toolID) {
        //If said tool id is present but invalid (not an object ID, return and error)
        const tool = await Tool.findById(req.body.toolID).catch((err) =>
            res.status(400).send(err),
        );
        //If the tool isn't null, and is valid assign the tool's module ID to the current module
        if (tool) {
            tool.moduleID = module._id;
            await tool.save();
        } else {
            return res.status(400).send({
                error: "Invalid toolID.",
            });
        }
    }

    //Add the new module to the database and return the appropriate response
    module.slides = slides;

    await module
        .save()
        .then((module) => res.status(200).json(module))
        .catch((err) => res.status(400).send(err));
};

export default connectDB(post);
