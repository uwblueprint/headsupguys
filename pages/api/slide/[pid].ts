import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../utils/mongoose";
import { get } from "./get";
import { patch } from "./patch";

const index = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            get(req, res);
            break;
        case "PATCH":
            patch(req, res);
            break;
        case "DELETE":
            break;
    }
};

export default connectDB(index);
