import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "./utils/mongoose";
import { Module } from "./models/module";

const dbTest = async (req: NextApiRequest, res: NextApiResponse) => {
    // Use mongoose here!
    const testModule = new Module({
        title: "please work",
    });
    await testModule.save();
};

export default connectDB(dbTest);
