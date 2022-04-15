import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import connectDB from "../utils/mongoose";
import getInRange from "./getInRange";
import post from "./post";

const index = async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponse>,
) => {
    switch (req.method) {
        case "GET":
            getInRange(req, res);
            break;
        case "POST":
            post(req, res);
            break;
        default:
            res.status(405).json({ error: "Method not supported" });
            return;
    }
};

export default connectDB(index);
