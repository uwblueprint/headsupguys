import { NextApiRequest, NextApiResponse } from "next";
import post from "pages/api/slide/post";
import { ErrorResponse } from "types/ErrorResponse";
import connectDB from "../../../utils/mongoose";

const index = async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponse>,
) => {
    switch (req.method) {
        case "POST":
            post(req, res);
            break;
        default:
            res.status(405).json({ error: "Method not supported" });
            return;
    }
};

export default connectDB(index);
