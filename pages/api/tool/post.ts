import { Tool } from "database/models/tool";
import { Module } from "database/models/module";
import { NextApiRequest, NextApiResponse } from "next";
const post = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    try {
        const tool = await Tool.create(req.body);
        //If the module contains a module id...
        if (req.body.linkedModuleID) {
            //If said module id is present but invalid (not an object ID), return and error
            const module = await Module.findById(req.body.linkedModuleID).catch(
                (err) => res.status(400).send(err),
            );
            //If the module isn't null and isn't already linked to another tool, assign the tool's ID to the module
            if (!module) {
                return res.status(400).send({
                    error: "Invalid moduleID.",
                });
            }
            if (module.toolID) {
                return res.status(400).send({
                    error: "Module is already linked to a tool.",
                });
            }
            module.toolID = tool._id;
            await module.save();
        }
        res.status(200).json(tool);
    } catch (err) {
        res.status(400).send(err);
    }
};

export default post;
