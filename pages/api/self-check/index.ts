import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../utils/mongoose";
import { postSelfCheck } from "./post";

const index = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "POST":
            await postSelfCheck(req, res);
            break;
        default:
            res.status(400).send({ error: "Invalid HTTP request" });
            break;
    }
};

export default connectDB(index);
