import { Tool } from "database/models/tool";
import { Module } from "../../../database/models/module";
import { NextApiRequest, NextApiResponse } from "next";
import { ModifierFlags } from "typescript";
import connectDB from "../utils/mongoose";

const deleteOne = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { id } = req.query;
    const tool = await Tool.findByIdAndDelete(id);

    await Tool.findByIdAndDelete(id)
        .then((tool) => res.status(200).json(tool))
        .catch((err) => res.status(500).send(err));

    if (tool.linkedModuleID != "") {
        const module = await Module.findById(tool.linkedModuleID);
        module.toolID = null;
        await module.save();
    }
};

export default connectDB(deleteOne);
