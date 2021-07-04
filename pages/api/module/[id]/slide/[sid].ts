import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import connectDB from "pages/api/utils/mongoose";
import { del } from "pages/api/slide/delete";

const index = async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponse>,
) => {
    switch (req.method) {
        case "DELETE":
            del(req, res);
            break;
        default:
            res.status(405).json({ error: "Method not supported" });
            return;
    }
};

export default connectDB(index);
