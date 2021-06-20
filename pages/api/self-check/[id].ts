import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../utils/mongoose";
import { delSelfCheckByID } from "./delete";
import { getSelfCheckByID } from "./get";
import { patchSelfCheckByID } from "./patch";

const index = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            getSelfCheckByID(req, res);
            break;
        case "PATCH":
            patchSelfCheckByID(req, res);
            break;
        case "DELETE":
            delSelfCheckByID(req, res);
            break;
    }
};

export default connectDB(index);
