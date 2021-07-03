import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../utils/mongoose";
import deleteOne from "./deleteOne";
import getOne from "./getOne";
import update from "./update";

const index = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            await getOne(req, res);
            break;
        case "PATCH":
            await update(req, res);
            break;
        case "DELETE":
            await deleteOne(req, res);
            break;
        default:
            res.status(405).json({ error: "Method not supported" });
            return;
    }
};

export default connectDB(index);
