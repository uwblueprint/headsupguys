import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import connectDB from "../utils/mongoose";
import del from "./delete";
import get from "./get";
import patch from "./patch";

const index = async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponse>,
) => {
    switch (req.method) {
        case "GET":
            get(req, res);
            break;
        case "PATCH":
            patch(req, res);
            break;
        case "DELETE":
            del(req, res);
            break;
        default:
            res.status(405).json({ error: "Method not supported" });
            return;
    }
};

export default connectDB(index);
