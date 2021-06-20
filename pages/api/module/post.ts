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
            tool: req.body.tool,
            slides: req.body.slides,
            status: req.body.status,
            editing: req.body.editing,
        });
        await postModule.save();
    }
    res.status(200).send(postModule);
};

export { post };
