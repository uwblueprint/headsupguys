import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../utils/mongoose";
import post from "./post";

const index = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "POST":
            await post(req, res);
            break;
        default:
            res.status(400).send({ error: "Invalid HTTP request" });
            break;
    }
};

export default connectDB(index);
