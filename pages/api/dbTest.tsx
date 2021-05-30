import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "./utils/mongoose";

const dbTest = async (req: NextApiRequest, res: NextApiResponse) => {
    // Use mongoose here!
    res.status(200).json({ name: "Hello World!!!" });
};

export default connectDB(dbTest);
