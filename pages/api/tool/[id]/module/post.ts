import { NextApiRequest, NextApiResponse } from "next";
import { Module } from "../../../models/module";
import { Tool } from "../../../models/tool";

const post = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    let postModule;
    const { id } = req.query;
    const tool = await Tool.findById(id).exec();

    if (!tool)
        return res
            .status(404)
            .send("The module with the given ID was not found.");

    if (!req.body.title)
        return res.status(400).send("Please provide a title for your module.");
    else {
        postModule = new Module({
            title: req.body.title,
            tool: tool,
            slides: req.body.slides,
            status: req.body.status,
            editing: req.body.editing,
        });
        await postModule.save();
    }
    res.status(200).send(postModule);
};

export { post };
