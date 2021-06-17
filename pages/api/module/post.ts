import { NextApiRequest, NextApiResponse } from "next";
import { Module } from "../models/module";

const post = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    let postModule;
    if (!req.body.title)
        return res.status(400).send("Please provide a title for your module.");
    else {
        postModule = new Module({
            title: req.body.title,
            tool: req.body.title ? req.body.title : req.body.title.default,
            slides: req.body.slides ? req.body.slides : req.body.slides.default,
            status: req.body.status ? req.body.status : req.body.status.default,
            editing: req.body.editing
                ? req.body.editing
                : req.body.editing.default,
        });
        await postModule.save();
    }
    res.status(200).send(postModule);
};

export { post };
