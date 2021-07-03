import { Tool } from "database/models/tool";
import { NextApiRequest, NextApiResponse } from "next";

const update = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { id } = req.query;

    await Tool.findByIdAndUpdate(id, req.body, { new: true })
        .then((tool) => res.status(200).json(tool))
        .catch((err) => res.status(500).send(err));
};

export default update;
