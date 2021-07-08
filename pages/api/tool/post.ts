import { Tool } from "database/models/tool";
import { NextApiRequest, NextApiResponse } from "next";

const post = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    await Tool.create(req.body)
        .then((tool) => res.status(200).json(tool))
        .catch((err) => res.status(400).send(err));
};

export default post;
