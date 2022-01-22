import { Tool } from "database/models/tool";
import { Module } from "database/models/module";
import { NextApiRequest, NextApiResponse } from "next";

const update = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { id } = req.query;
    try {
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
            if (module.toolID && module.toolID != id) {
                return res.status(400).send({
                    error: "Module is already linked to a tool.",
                });
            }
            module.toolID = id;
            await module.save();
        }
        const tool = await Tool.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        //Remove any other existing modules linked to tool
        const existingModules = await Module.find({
            toolID: id,
            _id: { $ne: tool.linkedModuleID },
        });

        for (const module of existingModules) {
            module.toolID = null;
            await module.save();
        }

        res.status(200).json(tool);
    } catch (err) {
        res.status(500).send(err);
    }
};

export default update;
