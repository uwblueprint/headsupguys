import { Module } from "database/models/module";
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../utils/mongoose";

const getAll = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { getToolTitles } = req.query;
    if (getToolTitles) {
        await Module.find({})
            .populate("toolID", "title")
            .then((modules) => res.status(200).json(modules))
            .catch((err) => res.status(500).send(err));
    } else {
        await Module.find({})
            .then((modules) => res.status(200).json(modules))
            .catch((err) => res.status(500).send(err));
    }
};

export default connectDB(getAll);
