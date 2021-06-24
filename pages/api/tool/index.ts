import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../utils/mongoose";
import getAll from "./getAll";

const index = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            await getAll(req, res);
            break;
        default:
            res.status(405).json({ error: "Method not supported" });
            return;
    }
};

export default connectDB(index);
