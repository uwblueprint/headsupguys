import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../utils/mongoose";
import { getQuestionByID } from "./get";

const index = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            await getQuestionByID(req, res);
            break;
        default:
            res.status(400).send({ error: "Invalid HTTP request" });
            break;
    }
};

export default connectDB(index);
