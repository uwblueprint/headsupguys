import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../utils/mongoose";
import { postSelfCheck } from "./post";

const index = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "POST":
            postSelfCheck(req, res);
            break;
    }
};

export default connectDB(index);
