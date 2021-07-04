import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "./utils/mongoose";
import { Module } from "../../../database/models/module";

const dbTest = async (req: NextApiRequest, res: NextApiResponse) => {
    // Use mongoose here!
};

export default connectDB(dbTest);
