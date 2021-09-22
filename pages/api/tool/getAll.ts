import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Tool, ToolInterface } from "../../../database/models/tool";

const getAll = async (
    req: NextApiRequest,
    res: NextApiResponse<ToolInterface | ErrorResponse>,
): Promise<void> => {
    await Tool.find({})
        .then((tools) => res.status(200).json(tools))
        .catch((err) => res.status(500).send(err));
};

export default getAll;
