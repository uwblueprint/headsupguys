import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../utils/mongoose";
import delSelfCheckByID from "./delete";
import getSelfCheckByID from "./get";
import patchSelfCheckByID from "./patch";

const index = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            await getSelfCheckByID(req, res);
            break;
        case "PATCH":
            await patchSelfCheckByID(req, res);
            break;
        case "DELETE":
            await delSelfCheckByID(req, res);
            break;
        default:
            res.status(400).send({ error: "Invalid HTTP request" });
            break;
    }
};

export default connectDB(index);
